# CodeKeybr Architecture Evolution

## Overview

This document describes the evolution from a hardcoded problem system to a scalable file-based architecture with AI-powered scraping capabilities.

## What Changed

### 1. Enhanced Type System

**File**: `types.ts`

Added new fields to the `Problem` interface:
```typescript
interface Problem {
  // ... existing fields
  tags: string[];          // NEW: For categorization and filtering
  timeComplexity: string;  // NEW: Big O time complexity
  spaceComplexity: string; // NEW: Big O space complexity
}
```

### 2. Modular Problem Structure

**Before**: Single file with all problems
```
data/
  problems.ts  (contains all problem objects)
```

**After**: Individual files per problem
```
data/
  problems.ts     (index file - imports and exports)
  problems/
    two_sum.ts
    reverse_string.ts
    contains_duplicate.ts
    valid_anagram.ts
```

### 3. Dynamic Problem Index

**File**: `data/problems.ts`

Now acts as a central index that imports individual problem files:

```typescript
import { TWO_SUM } from './problems/two_sum';
import { REVERSE_STRING } from './problems/reverse_string';
// ... more imports

export const PROBLEMS: Problem[] = [
  TWO_SUM,
  REVERSE_STRING,
  // ... more problems
];
```

### 4. Enhanced Typing Experience

**File**: `components/TypingArea.tsx`

Now displays complexity information between the explanation and code:

```
[Solution Explanation]

Complexity: O(N) Time | O(1) Space

[Code to Type]
```

### 5. AI-Powered Scraper

**File**: `scraper_agent.py`

A Python script that:
1. Fetches problems from LeetCode's GraphQL API
2. Uses OpenAI GPT-4o to process and format content
3. Generates TypeScript files in the correct format
4. Includes proper complexity analysis

## Benefits

### Scalability
- Easy to add new problems (just create a new file)
- No merge conflicts when multiple people add problems
- Clean separation of concerns

### Maintainability
- Each problem is self-contained
- Easy to find and edit specific problems
- Version control friendly (see diffs per problem)

### Automation
- AI agent handles the tedious conversion work
- Consistent formatting across all problems
- Automatic complexity analysis

### User Experience
- Complexity information helps learners understand trade-offs
- Tags enable future filtering features
- Better structured content for typing practice

## File Structure

```
codekeybr/
├── scraper_agent.py           # AI scraper script
├── SCRAPER_README.md          # Scraper documentation
├── types.ts                   # Enhanced Problem interface
├── App.tsx                    # Updated to pass complexity props
├── components/
│   └── TypingArea.tsx         # Enhanced with complexity display
└── data/
    ├── problems.ts            # Central index
    └── problems/              # Individual problem files
        ├── two_sum.ts
        ├── reverse_string.ts
        ├── contains_duplicate.ts
        └── valid_anagram.ts
```

## Adding New Problems

### Method 1: Using the Scraper (Recommended)

1. Add problem slug to `scraper_agent.py`:
   ```python
   slugs_to_crawl = ["two-sum", "your-problem-slug"]
   ```

2. Run the scraper:
   ```bash
   python scraper_agent.py
   ```

3. Import in `data/problems.ts`:
   ```typescript
   import { YOUR_PROBLEM } from './problems/your_problem';
   export const PROBLEMS = [..., YOUR_PROBLEM];
   ```

### Method 2: Manual Creation

1. Create a new file: `data/problems/your_problem.ts`

2. Use this template:
   ```typescript
   import { Problem } from '../../types';

   export const YOUR_PROBLEM: Problem = {
     id: "123_your_problem",
     title: "Your Problem Title",
     difficulty: "Medium",
     tags: ["Array", "Hash Table"],
     descriptionMarkdown: "...",
     solutionExplanation: "...",
     solutionCode: "...",
     timeComplexity: "O(N)",
     spaceComplexity: "O(1)"
   };
   ```

3. Import in `data/problems.ts`

## Future Enhancements

### Potential Features

1. **Tag-Based Filtering**
   - Filter problems by topic (Arrays, Strings, etc.)
   - Filter by difficulty
   - Filter by complexity class

2. **Progress Tracking**
   - Mark problems as completed
   - Track WPM progress per problem
   - Show mastery level

3. **Batch Scraping**
   - Scrape all problems from a LeetCode list
   - Scrape by topic/difficulty
   - Schedule regular updates

4. **Problem Metadata**
   - Company frequency data
   - Problem acceptance rate
   - Related problems

5. **Custom Categories**
   - Create custom problem sets
   - Blind 75, NeetCode 150, etc.
   - Company-specific lists

### Database Integration

For very large scale, consider moving to a database:
```
problems.json → SQLite → PostgreSQL
```

This would enable:
- Full-text search
- Complex queries
- User-specific problem lists
- Analytics and insights

## Migration Notes

### Breaking Changes

The `Problem` interface now requires additional fields:
- `tags: string[]`
- `timeComplexity: string`
- `spaceComplexity: string`

### Backwards Compatibility

Legacy exports are maintained:
```typescript
export const TWO_SUM_PROBLEM = TWO_SUM;  // Old name
export const REVERSE_STRING_PROBLEM = REVERSE_STRING;  // Old name
```

### TypeScript Errors

If you see type errors, ensure:
1. All problem objects include the new fields
2. `TypingArea` component receives complexity props
3. Import paths use `../../types` correctly

## Testing

After making changes:

```bash
# Check for TypeScript errors
npm run build

# Run development server
npm run dev

# Test specific features
# - Navigate to problems view
# - Select each problem
# - Verify complexity displays correctly
# - Complete a typing session
```

## Performance Considerations

### Current Scale
- 4 problems: Negligible impact
- 100 problems: Still very fast
- 1000+ problems: Consider lazy loading

### Optimization Tips

1. **Code Splitting**
   ```typescript
   const problem = await import(`./problems/${slug}.ts`);
   ```

2. **Lazy Loading**
   ```typescript
   const PROBLEMS = lazy(() => import('./data/problems'));
   ```

3. **Indexing**
   Create a lightweight index for navigation:
   ```typescript
   export const PROBLEM_INDEX = PROBLEMS.map(p => ({
     id: p.id,
     title: p.title,
     difficulty: p.difficulty
   }));
   ```

## Contributing

When adding problems:
1. Follow the existing file naming convention
2. Use the scraper when possible for consistency
3. Verify complexity analysis is accurate
4. Test the typing experience
5. Update this documentation if needed

## Questions?

- Check `SCRAPER_README.md` for scraper-specific help
- Review existing problem files for examples
- See `types.ts` for the complete interface definition
