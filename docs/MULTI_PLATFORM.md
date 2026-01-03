# Multi-Platform Support

**Author:** [shashuat](https://github.com/shashuat)

CodeKeybr now supports multiple coding platforms! Practice problems from LeetCode, Codeforces, DeepML, and more.

---

## Overview

The multi-platform architecture allows you to organize problems from different sources (LeetCode, Codeforces, DeepML, etc.) in a clean, modular way. Each platform has its own directory, index file, and set of problems.

### Benefits

- **Organized Content** - Problems grouped by platform
- **Easy Navigation** - Platform tabs in the UI
- **Scalable** - Add new platforms without affecting existing ones
- **Maintainable** - Each platform is self-contained
- **Extensible** - Simple pattern to follow for new platforms

---

## Current Platforms

### LeetCode
- **Focus:** Interview preparation
- **Problems:** 7+ and growing
- **Difficulty:** Easy, Medium, Hard
- **Tags:** Array, Hash Table, DP, Trees, Graphs, etc.
- **Status:** ✅ Active with AI scraper support

### Codeforces
- **Focus:** Competitive programming
- **Problems:** Ready to add
- **Difficulty:** Varies by contest
- **Tags:** Implementation, Greedy, Math, DP, etc.
- **Status:** 🚧 Structure ready, awaiting problems

### DeepML
- **Focus:** Machine learning
- **Problems:** Ready to add
- **Difficulty:** Varies
- **Tags:** Linear Algebra, Neural Networks, Optimization, etc.
- **Status:** 🚧 Structure ready, awaiting problems

---

```
src/data/
├── index.ts              # Main entry point, exports all platforms
├── problems.ts           # LeetCode problems
├── codeforces.ts         # Codeforces problems
├── deepml.ts             # DeepML problems
├── problems/             # LeetCode problem files
│   ├── TEMPLATE.ts
│   ├── two_sum.ts
│   └── ...
├── codeforces/           # Codeforces problem files
│   ├── TEMPLATE.ts
│   └── ...
└── deepml/               # DeepML problem files
    ├── TEMPLATE.ts
    └── ...
```

## Adding a New Platform

1. **Create a new directory** in `src/data/`:
   ```bash
   mkdir src/data/newplatform
   ```

2. **Create a TEMPLATE.ts** file in the new directory (copy from existing platforms)

3. **Create an index file** `src/data/newplatform.ts`:
   ```typescript
   import { Problem } from '../types';
   
   export const NEWPLATFORM_PROBLEMS: Problem[] = [];
   ```

4. **Add to PLATFORM_CATEGORIES** in `src/data/index.ts`:
   ```typescript
   {
     name: 'newplatform',
     displayName: 'New Platform',
     platform: 'newplatform',
     problems: NEWPLATFORM_PROBLEMS,
     description: 'Description of the platform'
   }
   ```

5. **Update the Platform type** in `src/types.ts`:
   ```typescript
   export type Platform = 'leetcode' | 'codeforces' | 'deepml' | 'newplatform';
   ```

## Adding a New Problem

### For LeetCode:
1. Copy `src/data/problems/TEMPLATE.ts` to a new file (e.g., `src/data/problems/new_problem.ts`)
2. Fill in all the fields
3. Import and add to the array in `src/data/problems.ts`

### For Codeforces:
1. Copy `src/data/codeforces/TEMPLATE.ts` to a new file
2. Fill in all the fields (use appropriate tags for Codeforces)
3. Import and add to the array in `src/data/codeforces.ts`

### For DeepML:
1. Copy `src/data/deepml/TEMPLATE.ts` to a new file
2. Fill in all the fields (use ML-specific tags)
3. Import and add to the array in `src/data/deepml.ts`

## Platform-Specific Tags

### LeetCode
- Array, String, Hash Table, Two Pointers, Sliding Window
- Binary Search, Stack, Queue, Linked List, Tree, Graph
- Dynamic Programming, Backtracking, Greedy, Sorting, Math

### Codeforces
- Implementation, Greedy, Math, Constructive, Brute Force
- Data Structures, Graphs, Number Theory, String, Sortings
- Binary Search, DFS and Similar, Trees, Combinatorics

### DeepML
- Linear Algebra, Neural Networks, Optimization, Probability
- Loss Functions, Activation Functions, Regularization
- Backpropagation, Gradient Descent, Matrix Operations

## Usage in App

The app now automatically:
- Shows tabs for each platform in the Problems view
- Filters problems by the selected platform
- Displays empty state when a platform has no problems
- Maintains separate problem indices for each platform

Users can switch between platforms and practice problems from their favorite coding challenge sites!

---

## How It Works in the App

### Platform Tabs

The Problems view displays tabs for each platform:
- Click a tab to switch platforms
- Problem count shown in badge
- Only problems for selected platform are displayed

### Empty State

When a platform has no problems yet:
- Shows a friendly message
- Encourages adding problems
- Provides icon visual

### Problem Organization

Problems are automatically:
- Categorized by platform
- Filtered when platform is selected
- Displayed with platform-specific styling

---

## Best Practices

### Adding Problems

1. **Use Templates** - Copy TEMPLATE.ts as starting point
2. **Follow Naming** - Use snake_case for filenames
3. **Set Platform** - Always include `platform` field
4. **Tag Appropriately** - Use platform-specific tags
5. **Update Index** - Import and export in platform index file

### Organizing Content

1. **Group by Difficulty** - Consider organizing by Easy/Medium/Hard
2. **Popular First** - Add commonly asked problems first
3. **Quality Over Quantity** - Better to have 10 good problems than 50 mediocre ones
4. **Test Everything** - Verify solutions work correctly

---

## Future Enhancements

### Planned Features
- **HackerRank** - Add HackerRank platform support
- **Project Euler** - Mathematical programming challenges
- **AtCoder** - Japanese competitive programming
- **Custom Platform** - User-defined problem sets

### Ideas
- Platform-specific themes/colors
- Cross-platform problem linking
- Platform statistics and analytics
- Import/export problem sets

---

**For implementation details, see:**
- [Architecture Guide](ARCHITECTURE.md)
- [Quick Start Guide](QUICK_START.md)
- [Main README](../README.md)

---

**Author:** [shashuat](https://github.com/shashuat)

