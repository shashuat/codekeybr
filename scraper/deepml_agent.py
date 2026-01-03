"""
DeepML Problem Scraper Agent for CodeKeybr

- Scrapes problems from https://www.deep-ml.com/problems/{id}
- Problems numbered sequentially from 1 to 301
- Uses OpenAI to structure content into TypeScript format
- Enforces PyTorch-based solutions
"""

import os
import json
import time
import requests
from bs4 import BeautifulSoup
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

client = OpenAI(api_key=OPENAI_API_KEY)

os.makedirs(OUTPUT_DIR, exist_ok=True)

# =====================
# DeepML Fetcher
# =====================

def get_deepml_problem(problem_id: int):
    """Fetch problem page from DeepML website"""
    url = f"https://www.deep-ml.com/problems/{problem_id}"
    
    try:
        r = requests.get(url, timeout=15, headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        })
        
        # Check if problem exists (404 means no problem at this ID)
        if r.status_code == 404:
            print(f"⚠️  Problem {problem_id} not found (404)")
            return None
            
        r.raise_for_status()
        return r.text
    except Exception as e:
        print(f"❌ Failed fetching problem {problem_id}: {e}")
        return None

def parse_deepml_html(html_content: str, problem_id: int):
    """Extract structured data from HTML"""
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Try to extract basic information
    # Note: This is a generic parser - may need adjustment based on actual HTML structure
    data = {
        'problem_id': problem_id,
        'html': html_content[:5000],  # Send first 5000 chars for context
        'full_html': html_content  # Send full HTML for AI to parse
    }
    
    return data

# =====================
# AI Processing
# =====================

def build_prompt(problem_data: dict):
    return f"""
You are converting a DeepML problem into a structured format for a typing-practice ML/DL interview app.

IMPORTANT: The solution code MUST use PyTorch. Extract the solution from the webpage if available, 
or write an optimal PyTorch implementation.

INPUT:
Problem ID: {problem_data['problem_id']}
HTML Content (Full page is provided):
{problem_data['full_html']}

TASKS:
1. Extract the problem title from the HTML
2. Determine difficulty (Easy/Medium/Hard) - if not specified, infer from complexity
3. Extract or identify relevant ML/DL tags from these categories:
   - Linear Algebra, Neural Networks, Optimization, Probability
   - Loss Functions, Activation Functions, Regularization
   - Backpropagation, Gradient Descent, Matrix Operations
   - CNNs, RNNs, Transformers, Attention
4. Convert problem description to clean Markdown
5. Extract or write a solution explanation (2-3 paragraphs)
6. Extract the solution code from the page OR write an optimized PyTorch solution
7. Analyze time and space complexity

CRITICAL REQUIREMENTS:
- Solution code MUST use PyTorch (import torch, torch.nn, etc.)
- Code should be production-ready and well-commented
- Use proper PyTorch tensor operations
- Include example usage

STRICT OUTPUT:
Return ONLY valid JSON with this exact schema:

{{
  "id": "dm_{problem_data['problem_id']}_title_in_snake_case",
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
        response_format={"type": "json_object"},
        temperature=0.3
    )

    raw = response.choices[0].message.content
    problem_json = json.loads(raw)
    return problem_json

# =====================
# File Generator
# =====================

def generate_problem_file(problem_id: int):
    """Generate TypeScript file for a DeepML problem"""
    
    # Create filename (will be updated after getting title)
    temp_file_name = f"dm_{problem_id}.ts"
    output_path = os.path.join(OUTPUT_DIR, temp_file_name)
    
    # Checkpointing: Skip if file already exists (unless force flag is set)
    if os.path.exists(output_path) and not FORCE_REGENERATE:
        print(f"⏭️  Skipping problem {problem_id} (already exists)")
        return
    
    print(f"📥 Fetching problem {problem_id}...")
    html_content = get_deepml_problem(problem_id)

    if not html_content:
        return

    problem_data = parse_deepml_html(html_content, problem_id)
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

            # Remove temp file if it exists and is different
            if output_path != final_output_path and os.path.exists(output_path):
                os.remove(output_path)

            print(f"✅ Generated {file_name}")
            time.sleep(1)  # Rate limiting
            return

        except Exception as e:
            print(f"⚠️ Attempt {attempt} failed: {e}")
            time.sleep(2)

    print(f"❌ Failed to process problem {problem_id} after {MAX_RETRIES} attempts")

# =====================
# Main
# =====================

def main():
    print("🚀 CodeKeybr DeepML Scraper")
    print("=" * 50)
    if FORCE_REGENERATE:
        print("⚠️  Force regenerate enabled - will overwrite existing files")
    print(f"📊 Processing problems {START_ID} to {END_ID}")
    print()

    # Filter problem IDs based on START_ID and END_ID
    problems_to_process = [pid for pid in PROBLEM_IDS if START_ID <= pid <= END_ID]
    
    total = len(problems_to_process)
    processed = 0
    skipped = 0
    failed = 0
    
    for problem_id in problems_to_process:
        # Check if already exists
        existing_files = [f for f in os.listdir(OUTPUT_DIR) 
                         if f.startswith(f"dm_{problem_id}_") and f.endswith('.ts')]
        
        existed_before = len(existing_files) > 0 and not FORCE_REGENERATE
        
        if existed_before:
            skipped += 1
            print(f"⏭️  Skipping problem {problem_id} (already exists)")
        else:
            try:
                generate_problem_file(problem_id)
                # Check if file was created
                new_files = [f for f in os.listdir(OUTPUT_DIR) 
                           if f.startswith(f"dm_{problem_id}_") and f.endswith('.ts')]
                if len(new_files) > 0:
                    processed += 1
                else:
                    failed += 1
            except Exception as e:
                print(f"❌ Error processing problem {problem_id}: {e}")
                failed += 1
        
        print()

    print("=" * 50)
    print(f"📁 Output directory: {OUTPUT_DIR}")
    print()
    print("📝 Generating deepml.ts index...")
    generate_deepml_index()
    print(f"📊 Stats: {processed} processed, {skipped} skipped, {failed} failed, {total} total")
    print("✨ Done!")

if __name__ == "__main__":
    main()
