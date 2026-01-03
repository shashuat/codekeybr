# CodeKeybr Architecture Evolution

**Author:** [shashuat](https://github.com/shashuat)

## Overview

This document describes the evolution from a hardcoded problem system to a scalable file-based architecture with AI-powered scraping capabilities.

CodeKeybr is a React-based typing practice application that helps developers build muscle memory for coding interview problems. The architecture emphasizes modularity, scalability, and ease of content addition through AI automation.

## What Changed

### 1. Enhanced Type System

**File**: `src/types.ts`

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
src/data/
  problems.ts  (contains all problem objects)
```

**After**: Individual files per problem
```
src/data/
  problems.ts     (index file - imports and exports)
  problems/
    two_sum.ts
    reverse_string.ts
    contains_duplicate.ts
    valid_anagram.ts
```

### 3. Dynamic Problem Index

**File**: `src/data/problems.ts`

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

**File**: `src/components/TypingArea.tsx`

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
- Support for multiple platforms (LeetCode, Codeforces, DeepML)

### Maintainability
- Each problem is self-contained
- Easy to find and edit specific problems
- Version control friendly (see diffs per problem)
- Auto-generated index files reduce manual work

### Automation
- AI agent handles the tedious conversion work
- Consistent formatting across all problems
- Automatic complexity analysis
- Auto-updates problem index files

## Current Architecture (2026)

### Frontend Architecture

**Component Structure:**
- `src/App.tsx` - Main application with view routing (practice, problems, leaderboard)
- `src/components/ProblemViewer.tsx` - Displays problem description with simple Markdown rendering
- `src/components/TypingArea.tsx` - Main typing interface with real-time validation
- `src/components/StatsModal.tsx` - Post-completion statistics display

**State Management:**
- `src/hooks/useTypingEngine.ts` - Custom hook managing typing state via reducer pattern
- Local state for UI concerns (modals, view switching)
- No external state management library (React hooks only)

**Data Flow:**
1. Problems imported from `src/data/index.ts`
2. Organized by platform categories
3. Selected problem passed to components via props
4. Typing engine manages completion state
5. Stats displayed in modal on completion

### Backend (Scraper) Architecture

**Python Modules:**
- `agent.py` - Main orchestrator for scraping workflow
- `problem_slugs.py` - Configuration of problems to scrape
- `generate_index.py` - Auto-generates TypeScript index files

**Scraper Workflow:**
1. Load environment variables (OpenAI API key)
2. Fetch problem from LeetCode GraphQL API
3. Extract problem metadata and Python starter code
4. Build detailed prompt for AI processing
5. Call OpenAI API to generate structured JSON
6. Generate TypeScript problem file
7. Auto-update problems.ts index

**Key Features:**
- Checkpointing (skip existing files unless forced)
- Retry logic (3 attempts per problem)
- Progress tracking and reporting
- Structured JSON output validation

### Type System

**Core Types:**
```typescript
type Platform = 'leetcode' | 'codeforces' | 'deepml';

interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  descriptionMarkdown: string;
  solutionCode: string;
  solutionExplanation: string;
  timeComplexity: string;
  spaceComplexity: string;
  platform: Platform;
}

interface PlatformCategory {
  name: string;
  displayName: string;
  platform: Platform;
  problems: Problem[];
  description: string;
}

interface TypingState {
  cursorIndex: number;
  userInput: string;
  mistakes: number;
  startTime: number | null;
  endTime: number | null;
  isActive: boolean;
  wpmHistory: { time: number; wpm: number }[];
}
```

### Performance Optimizations

1. **Memoization** - useMemo for combined text in TypingArea
2. **Auto-scrolling** - Cursor stays in view during typing
3. **Efficient re-renders** - Reducer pattern minimizes state updates
4. **Code splitting** - Per-problem files loaded on demand

### Future Architecture Considerations

**Potential Enhancements:**
- Backend API for user accounts and persistence
- Database for storing user progress
- WebSocket for real-time leaderboard updates
- CDN for problem content delivery
- Progressive Web App (PWA) support
- Mobile-responsive design improvements

---

For implementation details, see:
- [Quick Start Guide](QUICK_START.md)
- [Scraper Documentation](SCRAPER_README.md)
- [Multi-Platform Guide](MULTI_PLATFORM.md)

### User Experience
- Complexity information helps learners understand trade-offs
- Tags enable future filtering features
- Better structured content for typing practice

## File Structure

```
codekeybr/
├── scraper/
│   ├── agent.py               # AI scraper script
│   └── problem_slugs.py       # Problem configuration
├── src/
│   ├── types.ts               # Enhanced Problem interface
│   ├── App.tsx                # Updated to pass complexity props
│   ├── components/
│   │   └── TypingArea.tsx     # Enhanced with complexity display
│   └── data/
│       ├── problems.ts        # Central index
│       └── problems/          # Individual problem files
│           ├── two_sum.ts
│           ├── reverse_string.ts
│           ├── contains_duplicate.ts
│           └── valid_anagram.ts
└── docs/
    └── SCRAPER_README.md      # Scraper documentation
```

## Adding New Problems

### Method 1: Using the Scraper (Recommended)

1. Add problem slug to `scraper/problem_slugs.py`:
   ```python
   slugs_to_crawl = ["two-sum", "your-problem-slug"]
   ```

2. Run the scraper:
   ```bash
   cd scraper
   python agent.py
   ```

3. Import in `src/data/problems.ts`:
   ```typescript
   import { YOUR_PROBLEM } from './problems/your_problem';
   export const PROBLEMS = [..., YOUR_PROBLEM];
   ```

### Method 2: Manual Creation

1. Create a new file: `src/data/problems/your_problem.ts`

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
   const PROBLEMS = lazy(() => import('./src/data/problems'));
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
- See `src/types.ts` for the complete interface definition
