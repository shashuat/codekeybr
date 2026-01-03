# DeepML Scraper Quick Start Guide

## Overview
The DeepML scraper uses **browser automation (Playwright)** to fetch ML/DL problems from deep-ml.com (problems 1-301) and generates TypeScript files with PyTorch-based solutions.

Since DeepML is a React/Next.js app that loads content dynamically, we use Playwright to render the JavaScript and extract the actual visible content.

## Quick Start

### 1. Install Dependencies
```bash
cd /Users/shash/github/codekeybr
pip install -r scraper/requirements.txt

# Install Playwright browsers
playwright install chromium
```

### 2. Set Up OpenAI API Key
Create a `.env` file in the project root (if you don't have one):
```bash
echo "OPENAI_API_KEY=your-api-key-here" > .env
```

### 3. Test With One Problem
```bash
START_ID=1 END_ID=1 python -m scraper deepml
```

This will:
- Fetch problem 1 from https://www.deep-ml.com/problems/1
- Parse the HTML content
- Use AI to structure the problem with a PyTorch solution
- Generate a TypeScript file in `src/data/deepml/`
- Update `src/data/deepml.ts` index

### 4. Scrape Multiple Problems
```bash
# First 10 problems
START_ID=1 END_ID=10 python -m scraper deepml

# All problems (301 total - will take ~30-60 minutes)
python -m scraper deepml

# Specific range
START_ID=50 END_ID=100 python -m scraper deepml
```

## Features

✅ **Browser Automation** - Uses Playwright to render JavaScript content
✅ **Checkpointing** - Skips already processed problems automatically
✅ **PyTorch Solutions** - All solutions use PyTorch (not NumPy)
✅ **Auto-indexing** - Generates `deepml.ts` index file automatically
✅ **Error Handling** - Retries failed requests up to 3 times
✅ **404 Detection** - Gracefully handles missing problem IDs
✅ **Rate Limiting** - Built-in delays to avoid rate limits
✅ **Debug Files** - Saves extracted content for manual inspection

## Output Structure

Generated files:
```
src/data/deepml/
├── dm_1_matrix_multiplication.ts
├── dm_2_transpose_matrix.ts
├── dm_3_neural_network_forward_pass.ts
└── ...
```

Each file exports a problem in this format:
```typescript
export const DM_1_MATRIX_MULTIPLICATION: Problem = {
  id: "dm_1_matrix_multiplication",
  title: "Matrix Multiplication",
  difficulty: "Easy",
  tags: ["Linear Algebra", "Matrix Operations"],
  descriptionMarkdown: "...",
  solutionExplanation: "...",
  solutionCode: "import torch\n...",  // PyTorch code
  timeComplexity: "O(N^3)",
  spaceComplexity: "O(N^2)",
  platform: "deepml"
}
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `OPENAI_API_KEY` | required | Your OpenAI API key |
| `START_ID` | 1 | First problem ID to scrape |
| `END_ID` | 301 | Last problem ID to scrape |
| `FORCE_REGENERATE` | false | Set to `true` to overwrite existing files |
| `HEADLESS` | true | Set to `false` to see browser window (useful for debugging) |

## Examples

```bash
# Test with first problem
START_ID=1 END_ID=1 python -m scraper deepml

# Scrape first 50 problems
START_ID=1 END_ID=50 python -m scraper deepml

# Continue from problem 51
START_ID=51 END_ID=301 python -m scraper deepml

# Regenerate problem 25 (overwrite existing)
FORCE_REGENERATE=true START_ID=25 END_ID=25 python -m scraper deepml

# All problems with force regeneration
FORCE_REGENERATE=true python -m scraper deepml
```

## Troubleshooting

### "ModuleNotFoundError: No module named 'playwright'"
```bash
pip install playwright
playwright install chromium
```

### "Executable doesn't exist" error
Run the Playwright install command:
```bash
playwright install chromium
```

### Want to see the browser window?
```bash
HEADLESS=false START_ID=1 END_ID=1 python -m scraper deepml
```

### Content extraction issues
Check the debug files created:
- `deepml_problem_{id}_content.txt` - Shows extracted text content
- Compare with the actual website to see if content is missing

### "404 Not Found" for certain problem IDs
This is normal - some problem IDs don't exist on the website. The scraper will skip them automatically.
This is normal - some problem IDs don't exist on the website. The scraper will skip them automatically.

### API Rate Limits
The scraper includes 1-second delays between requests. If you still hit rate limits, consider:
- Processing in smaller batches
- Increasing delays in the code
- Checking your OpenAI API tier

### Out of Context Errors
If problems have very large HTML content, you may need to:
- Switch to a model with larger context (gpt-4-turbo)
- Reduce the HTML content sent to the API

## Cost Estimate

- **Per problem:** ~$0.02-0.08 (using gpt-4o)
- **First 10 problems:** ~$0.20-0.80
- **First 100 problems:** ~$2-8
- **All 301 problems:** ~$6-25

💡 Tip: Start small and scale up!

## Next Steps

After scraping:
1. Check generated files in `src/data/deepml/`
2. Verify `src/data/deepml.ts` was updated
3. Test in your app: `npm run dev`
4. Review and commit changes

## Support

For issues or questions:
- Check the full documentation: `docs/SCRAPER_README.md`
- Review the code: `scraper/deepml_agent.py`
- Open an issue on GitHub
