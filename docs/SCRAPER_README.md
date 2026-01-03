# CodeKeybr Problem Scraper

An AI-powered tool to automatically scrape LeetCode problems and convert them into CodeKeybr's problem format.

## Setup

### 1. Install Dependencies

```bash
pip install openai requests
```

### 2. Set Your OpenAI API Key

You have three options:

**Option A: Environment Variable (Recommended)**
```bash
export OPENAI_API_KEY="sk-your-api-key-here"
```

**Option B: Edit the Script**
Open `scraper_agent.py` and replace:
```python
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "your_api_key_here")
```

**Option C: Create a .env File**
Create a `.env` file in the project root:
```
OPENAI_API_KEY=sk-your-api-key-here
```
Then add this to the script:
```python
from dotenv import load_dotenv
load_dotenv()
```

## Usage

### Basic Usage

```bash
python scraper_agent.py
```

This will scrape the default problems:
- Two Sum
- Reverse String
- Contains Duplicate
- Valid Anagram

### Adding More Problems

Edit the `slugs_to_crawl` list in `scraper_agent.py`:

```python
slugs_to_crawl = [
    "two-sum",
    "best-time-to-buy-and-sell-stock",
    "valid-palindrome",
    "merge-two-sorted-lists",
    "binary-search"
]
```

**How to find problem slugs:**
1. Go to LeetCode problem page: `https://leetcode.com/problems/two-sum/`
2. The slug is the last part: `two-sum`

### Output

Generated files will be saved to `data/problems/` with this structure:

```typescript
import { Problem } from '../../types';

export const TWO_SUM: Problem = {
  "id": "1_two_sum",
  "title": "Two Sum",
  "difficulty": "Easy",
  "tags": ["Array", "Hash Table"],
  "descriptionMarkdown": "...",
  "solutionExplanation": "...",
  "solutionCode": "...",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(N)"
};
```

## After Scraping

### 1. Review Generated Files

Check the generated `.ts` files in `data/problems/` to ensure quality.

### 2. Update the Problem Index

Edit `data/problems.ts` to import your new problems:

```typescript
import { TWO_SUM } from './problems/two_sum';
import { YOUR_NEW_PROBLEM } from './problems/your_new_problem';

export const PROBLEMS: Problem[] = [
  TWO_SUM,
  YOUR_NEW_PROBLEM,
  // ... more problems
];
```

### 3. Test Your App

```bash
npm run dev
```

Navigate to the problems view and verify the new problems appear correctly.

## Customization

### Adjusting the AI Prompt

Edit the `prompt` variable in `generate_problem_file()` to customize how problems are processed.

### Changing the Model

Replace `gpt-4o` with another model:

```python
response = client.chat.completions.create(
    model="gpt-4o-mini",  # Cheaper option
    # ... rest of the config
)
```

### Custom Output Directory

Change the output directory:

```python
OUTPUT_DIR = "./custom/path/to/problems"
```

## Troubleshooting

### "No data returned for {slug}"

- The problem slug might be incorrect
- LeetCode's GraphQL API might be temporarily unavailable
- Try accessing the problem URL directly to verify it exists

### "Error processing {slug}"

- Check your OpenAI API key is valid and has credits
- Verify your internet connection
- The API might be rate-limited - wait a moment and retry

### Import Errors in TypeScript

Make sure the path in the import statement matches your file structure:

```typescript
import { Problem } from '../../types';  // Adjust based on your structure
```

## Best Practices

1. **Start Small**: Test with 1-2 problems before batch processing
2. **Review AI Output**: Always verify the generated solutions are correct
3. **Cost Management**: Each problem costs ~$0.01-0.05 depending on complexity
4. **Version Control**: Commit generated files separately for easy review
5. **Rate Limiting**: Add delays between requests if scraping many problems

## Advanced: Batch Processing

For processing many problems, add a delay:

```python
import time

for slug in slugs_to_crawl:
    generate_problem_file(slug)
    time.sleep(2)  # Wait 2 seconds between requests
```

## Cost Estimation

Using `gpt-4o`:
- ~2-3K tokens per problem
- Cost: ~$0.01-0.05 per problem
- 100 problems: ~$1-5

Using `gpt-4o-mini` (cheaper):
- Same token count
- Cost: ~$0.001-0.005 per problem
- 100 problems: ~$0.10-0.50

## Contributing

Found a bug or want to improve the scraper? Submit a PR!

## License

MIT - Feel free to modify and distribute
