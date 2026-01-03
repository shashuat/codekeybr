"""
LeetCode Problem Scraper Agent for CodeKeybr (Improved)

- Uses OpenAI Responses API
- Uses gpt-5 for best reasoning + structure
- Enforces strict JSON output
- Safer error handling and retries
"""

import os
import json
import time
import requests
from openai import OpenAI
from dotenv import load_dotenv
from .problem_slugs import SLUGS_TO_CRAWL
from .generate_index import generate_problems_index

# Load environment variables from .env file
load_dotenv()

# =====================
# Configuration
# =====================

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OUTPUT_DIR = "./data/problems"
MODEL_NAME = "gpt-5"   
MAX_RETRIES = 3
FORCE_REGENERATE = os.getenv("FORCE_REGENERATE", "false").lower() == "true"
client = OpenAI(api_key=OPENAI_API_KEY)

os.makedirs(OUTPUT_DIR, exist_ok=True)

# =====================
# LeetCode Fetcher
# =====================

def get_leetcode_problem(title_slug: str):
    url = "https://leetcode.com/graphql"
    query = """
    query questionData($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        questionId
        title
        difficulty
        content
        topicTags { name }
        codeSnippets { lang, code }
      }
    }
    """

    try:
        r = requests.post(
            url,
            json={"query": query, "variables": {"titleSlug": title_slug}},
            timeout=10
        )
        r.raise_for_status()
        data = r.json()
        return data["data"]["question"]
    except Exception as e:
        print(f"❌ Failed fetching {title_slug}: {e}")
        return None

# =====================
# AI Processing
# =====================

def build_prompt(problem, python_code: str):
    return f"""
You are converting a LeetCode problem into a structured format
for a typing-practice interview app.

INPUT DATA:
Title: {problem['title']}
Difficulty: {problem['difficulty']}
Tags: {[t['name'] for t in problem['topicTags']]}

HTML_CONTENT:
{problem['content']}

STARTER_CODE (Python):
{python_code}

TASKS:
1. Convert HTML content to clean, readable Markdown
2. Write a concise optimal-solution explanation (2–3 paragraphs)
3. Provide an optimized Python solution (production-ready)
4. Analyze time and space complexity
5. Map tags to common interview categories
   (Array, Hash Table, Two Pointers, Sliding Window, DFS, BFS, etc.)

STRICT OUTPUT:
Return ONLY valid JSON with the following schema:

{{
  "id": "{problem['questionId']}_{problem['title'].lower().replace(' ', '_')}",
  "title": "{problem['title']}",
  "difficulty": "{problem['difficulty']}",
  "tags": ["Array", "Hash Table"],
  "descriptionMarkdown": "...",
  "solutionExplanation": "...",
  "solutionCode": "...",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)"
}}
"""

def call_ai(prompt: str):
    response = client.responses.create(
        model=MODEL_NAME,
        input=[
            {
                "role": "system",
                "content": "You are a precise coding tutor. Always return ONLY valid JSON matching the schema."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    # Parse the response manually since response_format is not supported in Responses API
    raw = response.output_text
    problem_json = json.loads(raw)
    return problem_json

# =====================
# File Generator
# =====================

def generate_problem_file(slug: str):
    file_name = f"{slug.replace('-', '_')}.ts"
    output_path = os.path.join(OUTPUT_DIR, file_name)
    
    # Checkpointing: Skip if file already exists (unless force flag is set)
    if os.path.exists(output_path) and not FORCE_REGENERATE:
        print(f"⏭️  Skipping {slug} (already exists)")
        return
    
    print(f"📥 Fetching: {slug}")
    problem = get_leetcode_problem(slug)

    if not problem:
        return

    python_code = ""
    for s in problem.get("codeSnippets", []):
        if s["lang"] in ("Python", "Python3"):
            python_code = s["code"]
            break

    prompt = build_prompt(problem, python_code)

    for attempt in range(1, MAX_RETRIES + 1):
        try:
            print(f"🤖 AI processing (attempt {attempt})...")
            problem_json = call_ai(prompt)

            ts_content = (
                "import { Problem } from '../../types';\n\n"
                f"export const {slug.upper().replace('-', '_')}: Problem = "
                f"{json.dumps(problem_json, indent=2)};\n"
            )

            with open(output_path, "w", encoding="utf-8") as f:
                f.write(ts_content)

            print(f"✅ Generated {file_name}")
            return

        except Exception as e:
            print(f"⚠️ Attempt {attempt} failed: {e}")
            time.sleep(1)

    print(f"❌ Failed to process {slug} after {MAX_RETRIES} attempts")

# =====================
# Main
# =====================

def main():
    print("🚀 CodeKeybr LeetCode Scraper (Upgraded)")
    print("=" * 50)
    if FORCE_REGENERATE:
        print("⚠️  Force regenerate enabled - will overwrite existing files")
    print()

    total = len(SLUGS_TO_CRAWL)
    processed = 0
    skipped = 0
    
    for slug in SLUGS_TO_CRAWL:
        file_name = f"{slug.replace('-', '_')}.ts"
        output_path = os.path.join(OUTPUT_DIR, file_name)
        existed_before = os.path.exists(output_path) and not FORCE_REGENERATE
        
        generate_problem_file(slug)
        
        if existed_before:
            skipped += 1
        else:
            processed += 1
        print()

    print("=" * 50)
    print(f"📁 Output directory: {OUTPUT_DIR}")
    print()
    print("📝 Generating problems.ts index...")
    generate_problems_index()
    print(f"📊 Stats: {processed} processed, {skipped} skipped, {total} total")
    print("✨ Done!")

if __name__ == "__main__":
    main()
