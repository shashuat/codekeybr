"""
DeepML Problem Scraper Agent with Browser Automation

- Uses Playwright to render JavaScript and get actual content
- Scrapes problems from https://www.deep-ml.com/problems/{id}
- Problems numbered sequentially from 1 to 301
- Uses OpenAI GPT-5 to structure content into TypeScript format
- Enforces PyTorch-based solutions
"""

import os
import json
import time
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout
from openai import OpenAI
from dotenv import load_dotenv
from .deepml_problem_ids import PROBLEM_IDS
from .generate_deepml_index import generate_deepml_index

# Load environment variables from .env file
load_dotenv()

# =====================
# Configuration
# =====================

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OUTPUT_DIR = "./src/data/deepml"
MODEL_NAME = "gpt-5"
MAX_RETRIES = 3
FORCE_REGENERATE = os.getenv("FORCE_REGENERATE", "false").lower() == "true"
START_ID = int(os.getenv("START_ID", "1"))
END_ID = int(os.getenv("END_ID", "301"))
HEADLESS = os.getenv("HEADLESS", "true").lower() == "true"

client = OpenAI(api_key=OPENAI_API_KEY)

os.makedirs(OUTPUT_DIR, exist_ok=True)

# =====================
# Browser-based DeepML Fetcher
# =====================

def get_deepml_problem_content(page, problem_id: int):
    """Fetch problem content using browser automation"""
    url = f"https://www.deep-ml.com/problems/{problem_id}"
    
    try:
        print(f"🌐 Loading page...")
        page.goto(url, timeout=60000)
        
        # Wait for initial load
        print(f"⏳ Waiting 3 seconds for JavaScript to render...")
        time.sleep(3)
        
        # Try to click on "Problem Description" tab to ensure it's active
        try:
            problem_desc_button = page.locator("text=Problem Description").first
            if problem_desc_button.is_visible():
                print(f"🖱️  Clicking 'Problem Description' tab...")
                problem_desc_button.click()
                time.sleep(2)  # Wait for content to load after click
        except Exception as e:
            print(f"⚠️  Could not click Problem Description: {e}")
        
        # Scroll down to trigger any lazy-loaded content
        print(f"📜 Scrolling page to load content...")
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(2)
        page.evaluate("window.scrollTo(0, 0)")
        time.sleep(1)
        
        # Extract all visible text from the page
        print(f"📄 Extracting page content...")
        page_text = page.inner_text('body')
        
        # Clean up the content - remove navigation and UI elements
        print(f"🧹 Cleaning content...")
        lines = page_text.split('\n')
        
        # Remove common UI elements
        ui_keywords = [
            'Deep-ML', 'Problems', 'Labs', 'NEW', 'Collections', 'Leaderboard', 
            'Deep-0', 'Jobs', 'Premium', 'Log in', 'Problem Description', 
            'Solution', 'Video', 'Comments', 'Playground', 'Notebook Mode',
            'Run Code', 'Reset', 'Save Code', 'Submissions', 'Ask Tutor',
            'AI Tutor', 'deep-0', 'Contributors:', 'Contribute', 'Request Edit',
            "won't give code", "I'm stuck on", "Can you outline", "Why might my",
            'TRY ASKING:', 'Send', 'Enter to send', 'Shift+Enter',
            'How can I help you?', 'Ask about strategies', "I'm here to guide you"
        ]
        
        cleaned_lines = []
        skip_next = False
        
        for i, line in enumerate(lines):
            line = line.strip()
            
            # Skip empty lines
            if not line:
                continue
            
            # Skip UI elements
            if skip_next:
                skip_next = False
                continue
                
            # Check if line matches UI keywords
            is_ui = False
            for keyword in ui_keywords:
                if line == keyword or line.startswith(keyword):
                    is_ui = True
                    break
            
            if is_ui:
                continue
            
            # Keep meaningful content
            if len(line) > 3:  # Avoid very short lines
                cleaned_lines.append(line)
        
        # Rejoin cleaned content
        cleaned_text = '\n'.join(cleaned_lines)
        
        print(f"✅ Cleaned from {len(page_text)} to {len(cleaned_text)} characters")
        
        # Also try to get code blocks
        problem_data = {
            'problem_id': problem_id,
            'url': url,
            'full_text': cleaned_text,
            'original_text': page_text,
            'title': None,
            'description': None,
            'solution': None,
            'code_examples': []
        }
        
        # Try to extract title (usually in h1 or h2)
        try:
            title_element = page.query_selector('h1, h2')
            if title_element:
                problem_data['title'] = title_element.inner_text().strip()
        except:
            pass
        
        # Try to get code blocks
        try:
            code_elements = page.query_selector_all('pre, code')
            for code_elem in code_elements[:5]:  # Limit to first 5
                code_text = code_elem.inner_text().strip()
                if len(code_text) > 20:  # Only meaningful code blocks
                    problem_data['code_examples'].append(code_text)
        except:
            pass
        
        print(f"✅ Extracted {len(cleaned_text)} characters of content")
        print(f"   Found {len(problem_data['code_examples'])} code blocks")
        
        return problem_data
        
    except PlaywrightTimeout:
        print(f"⏱️  Timeout loading problem {problem_id}")
        return None
    except Exception as e:
        print(f"❌ Failed fetching problem {problem_id}: {e}")
        return None

# =====================
# AI Processing
# =====================

def build_prompt(problem_data: dict):
    problem_id = problem_data['problem_id']
    page_text = problem_data['full_text']
    
    # Include code examples if found
    code_examples_text = ""
    if problem_data['code_examples']:
        code_examples_text = "\n\nCODE EXAMPLES FOUND ON PAGE:\n" + "\n\n".join(
            f"```\n{code}\n```" for code in problem_data['code_examples']
        )
    
    return f"""
You are converting a DeepML problem into a structured format for a typing-practice ML/DL interview app.

IMPORTANT: The solution code MUST use PyTorch. Extract the solution from the webpage content if available, 
or write an optimal PyTorch implementation.

INPUT:
Problem ID: {problem_id}
URL: {problem_data['url']}

FULL PAGE TEXT CONTENT:
{page_text}
{code_examples_text}

TASKS:
1. Extract the problem title from the content
2. Determine difficulty (Easy/Medium/Hard) - if not specified, infer from complexity
3. Extract or identify relevant ML/DL tags from these categories:
   - Linear Algebra, Neural Networks, Optimization, Probability
   - Loss Functions, Activation Functions, Regularization
   - Backpropagation, Gradient Descent, Matrix Operations
   - CNNs, RNNs, Transformers, Attention, Embeddings
4. Convert problem description to clean Markdown (extract from the text)
5. Extract or write a solution explanation (2-3 paragraphs)
6. Extract the solution code from the page OR write an optimized PyTorch solution
7. Analyze time and space complexity

CRITICAL REQUIREMENTS:
- Solution code MUST use PyTorch (import torch, torch.nn, etc.)
- Code should be production-ready and well-commented
- Use proper PyTorch tensor operations
- Include example usage if possible
- If the page has a solution in NumPy, convert it to PyTorch

STRICT OUTPUT:
Return ONLY valid JSON with this exact schema:

{{
  "id": "dm_{problem_id}_title_in_snake_case",
  "title": "Problem Title",
  "difficulty": "Medium",
  "tags": ["Neural Networks", "Backpropagation"],
  "descriptionMarkdown": "Full problem description in markdown...",
  "solutionExplanation": "Clear explanation of the approach and math...",
  "solutionCode": "import torch\\nimport torch.nn as nn\\n\\ndef solution():\\n    ...",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)"
}}

Ensure the JSON is valid and properly escaped. The solutionCode must be PyTorch-based.
"""

def call_ai(prompt: str):
    """Call OpenAI API with retry logic"""
    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {
                "role": "system",
                "content": "You are a precise ML/DL coding tutor. Always return ONLY valid JSON matching the schema. Solutions must use PyTorch."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        response_format={"type": "json_object"}
    )

    raw = response.choices[0].message.content
    problem_json = json.loads(raw)
    return problem_json

# =====================
# File Generator
# =====================

def generate_problem_file(page, problem_id: int):
    """Generate TypeScript file for a DeepML problem"""
    
    # Check if already exists
    existing_files = [f for f in os.listdir(OUTPUT_DIR) 
                     if f.startswith(f"dm_{problem_id}_") and f.endswith('.ts')]
    
    if existing_files and not FORCE_REGENERATE:
        print(f"⏭️  Skipping problem {problem_id} (already exists)")
        return True
    
    print(f"📥 Fetching problem {problem_id}...")
    problem_data = get_deepml_problem_content(page, problem_id)

    if not problem_data:
        return False

    prompt = build_prompt(problem_data)

    for attempt in range(1, MAX_RETRIES + 1):
        try:
            print(f"🤖 AI processing (attempt {attempt})...")
            problem_json = call_ai(prompt)
            
            # Ensure platform is set
            problem_json['platform'] = 'deepml'

            # Generate constant name from title
            title_snake = problem_json['title'].lower().replace(' ', '_').replace('-', '_')
            title_snake = ''.join(c if c.isalnum() or c == '_' else '_' for c in title_snake)
            const_name = f"DM_{problem_id}_{title_snake}".upper()
            
            # Generate filename
            file_name = f"dm_{problem_id}_{title_snake}.ts"
            final_output_path = os.path.join(OUTPUT_DIR, file_name)
            
            # Generate TypeScript content
            ts_content = (
                "import { Problem } from '../../types';\n\n"
                f"export const {const_name}: Problem = "
                f"{json.dumps(problem_json, indent=2)};\n"
            )

            with open(final_output_path, "w", encoding="utf-8") as f:
                f.write(ts_content)

            print(f"✅ Generated {file_name}")
            time.sleep(2)  # Rate limiting between problems
            return True

        except Exception as e:
            print(f"⚠️ Attempt {attempt} failed: {e}")
            if attempt < MAX_RETRIES:
                time.sleep(3)

    print(f"❌ Failed to process problem {problem_id} after {MAX_RETRIES} attempts")
    return False

# =====================
# Main
# =====================

def main():
    print("🚀 CodeKeybr DeepML Scraper (Browser-based)")
    print("=" * 50)
    if FORCE_REGENERATE:
        print("⚠️  Force regenerate enabled - will overwrite existing files")
    print(f"📊 Processing problems {START_ID} to {END_ID}")
    print(f"🌐 Headless mode: {HEADLESS}")
    print()

    # Filter problem IDs based on START_ID and END_ID
    problems_to_process = [pid for pid in PROBLEM_IDS if START_ID <= pid <= END_ID]
    
    total = len(problems_to_process)
    processed = 0
    skipped = 0
    failed = 0
    
    # Launch browser
    print("🚀 Launching browser...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=HEADLESS)
        page = browser.new_page()
        
        print("✅ Browser ready\n")
        
        for problem_id in problems_to_process:
            # Check if already exists
            existing_files = [f for f in os.listdir(OUTPUT_DIR) 
                             if f.startswith(f"dm_{problem_id}_") and f.endswith('.ts')]
            
            if existing_files and not FORCE_REGENERATE:
                skipped += 1
                print(f"⏭️  Skipping problem {problem_id} (already exists)\n")
                continue
            
            try:
                success = generate_problem_file(page, problem_id)
                if success:
                    processed += 1
                else:
                    failed += 1
            except Exception as e:
                print(f"❌ Error processing problem {problem_id}: {e}")
                failed += 1
            
            print()
        
        browser.close()

    print("=" * 50)
    print(f"📁 Output directory: {OUTPUT_DIR}")
    print()
    print("📝 Generating deepml.ts index...")
    generate_deepml_index()
    print(f"📊 Stats: {processed} processed, {skipped} skipped, {failed} failed, {total} total")
    print("✨ Done!")

if __name__ == "__main__":
    main()
