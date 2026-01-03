# CodeKeybr Problem Scraper

**Author:** [shashuat](https://github.com/shashuat)

An AI-powered tool to automatically scrape LeetCode problems and convert them into CodeKeybr's problem format.

## Features

- 🤖 **AI-Powered** - Uses OpenAI GPT-4 to process and format problem content
- 📥 **GraphQL Integration** - Fetches problems directly from LeetCode's API
- 📝 **Auto-Generation** - Creates TypeScript problem files automatically
- ✅ **Checkpointing** - Skips already processed problems (unless forced)
- 🔄 **Retry Logic** - Automatically retries failed requests (up to 3 times)
- 📊 **Progress Tracking** - Shows real-time status of scraping operations
- 🎯 **Smart Formatting** - Converts HTML to clean Markdown
- 🧠 **Complexity Analysis** - Auto-calculates Big O time/space complexity

## Setup

### 1. Install Dependencies

**Required packages:**
```bash
pip install openai requests python-dotenv
```

**What each package does:**
- `openai` - OpenAI API client for GPT-4 integration
- `requests` - HTTP client for LeetCode GraphQL queries
- `python-dotenv` - Load environment variables from .env file

### 2. Set Your OpenAI API Key

You have two options:

**Option A: Using .env File (Recommended)**

1. Create a `.env` file in the project root:
   ```bash
   touch .env
   ```

2. Add your API key to the file:
   ```env
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

3. The scraper will automatically load it using `python-dotenv`

**Option B: Environment Variable**
```bash
export OPENAI_API_KEY="sk-your-api-key-here"
```

**Getting an API Key:**
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new secret key
5. Copy and save it securely

## Usage

### Basic Usage

From the project root directory:

```bash
python -m scraper.agent
```

**What happens:**
1. Loads environment variables from `.env`
2. Reads problem slugs from `scraper/problem_slugs.py`
3. For each slug:
   - Checks if file already exists (skips if yes)
   - Fetches problem from LeetCode GraphQL API
   - Processes with OpenAI GPT-4
   - Generates TypeScript problem file
   - Saves to `src/data/problems/`
4. Auto-generates `src/data/problems.ts` index file
5. Prints summary statistics

### Force Regeneration

To overwrite existing problem files:

```bash
FORCE_REGENERATE=true python -m scraper.agent
```

**Use cases:**
- Update problem format/structure
- Regenerate with improved AI prompts
- Fix errors in existing problems

### Configuration

Edit `scraper/problem_slugs.py` to configure which problems to scrape:

```python
SLUGS_TO_CRAWL = [
    "two-sum",
    "reverse-linked-list",
    "valid-parentheses",
    "best-time-to-buy-and-sell-stock",
    # Add more problem slugs here
]
```

**How to find problem slugs:**
1. Go to LeetCode problem page: `https://leetcode.com/problems/two-sum/`
2. The slug is the last part: `two-sum`

### Output

Generated files will be saved to `src/data/problems/` with this structure:

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

## Troubleshooting

### Common Issues

**Error: `OpenAIError: The api_key client option must be set`**

**Cause:** API key not loaded properly

**Solutions:**
1. Verify `.env` file exists in project root
2. Check API key is correctly formatted: `OPENAI_API_KEY=sk-...`
3. Ensure `python-dotenv` is installed: `pip install python-dotenv`
4. Verify `.env` has no quotes around the key value

**Error: `ModuleNotFoundError: No module named 'openai'`**

**Solution:**
```bash
pip install openai requests python-dotenv
```

**Error: `Failed fetching <slug>: JSONDecodeError`**

**Cause:** LeetCode API returned invalid JSON or rate limiting

**Solutions:**
1. Wait a few minutes and try again
2. Check if the problem slug is correct
3. Verify internet connection

**Error: `Attempt X failed: <AI error>`**

**Cause:** OpenAI API error or rate limit

**Solutions:**
1. Check your OpenAI account has available credits
2. Verify API key is valid and not expired
3. Wait and retry (scraper automatically retries 3 times)

### Debug Mode

To see detailed output, you can modify the scraper temporarily:

```python
# In scraper/agent.py, add after imports:
import logging
logging.basicConfig(level=logging.DEBUG)
```

### Getting Help

If you encounter issues:
1. Check the [main README](../README.md) troubleshooting section
2. Review [GitHub Issues](https://github.com/shashuat/codekeybr/issues)
3. Open a new issue with error details

---

## Advanced Usage

### Custom AI Model

To use a different OpenAI model, edit `scraper/agent.py`:

```python
MODEL_NAME = "gpt-4o"  # or "gpt-4", "gpt-3.5-turbo", etc.
```

### Batch Processing

For large batch operations, consider:

```bash
# Process in chunks to avoid rate limits
for i in {0..100..10}; do
    python -m scraper.agent
    sleep 60  # Wait between batches
done
```

### Custom Output Directory

Edit `scraper/agent.py`:

```python
OUTPUT_DIR = "./src/data/custom_problems"
```

---

**For more information, see:**
- [Architecture Guide](ARCHITECTURE.md)
- [Multi-Platform Guide](MULTI_PLATFORM.md)
- [Main README](../README.md)

## After Scraping

### 1. Review Generated Files

Check the generated `.ts` files in `src/data/problems/` to ensure quality.

### 2. Automatic Index Update

The scraper automatically updates `src/data/problems.ts` with new imports. No manual editing needed!

### 3. Test Your App

```bash
npm run dev
```

Navigate to the problems view and verify the new problems appear correctly.

### 4. Commit Changes

```bash
git add src/data/problems/
git commit -m "Add new LeetCode problems"
```

## Best Practices

1. **Start Small**: Test with 1-2 problems before batch processing
2. **Review AI Output**: Always verify the generated solutions are correct
3. **Cost Management**: Each problem costs ~$0.01-0.05 depending on complexity
4. **Version Control**: Commit generated files separately for easy review
5. **Rate Limiting**: Add delays between requests if scraping many problems

## Cost Estimation

Using `gpt-4` or `gpt-4o`:
- ~2-3K tokens per problem
- Cost: ~$0.01-0.05 per problem
- 100 problems: ~$1-5

Using `gpt-4o-mini` (cheaper):
- Same token count
- Cost: ~$0.001-0.005 per problem
- 100 problems: ~$0.10-0.50

---

**Author:** [shashuat](https://github.com/shashuat)

**License:** MIT - Feel free to modify and distribute

