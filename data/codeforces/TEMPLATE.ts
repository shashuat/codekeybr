import { Problem } from '../../types';

/**
 * TEMPLATE: Copy this file to create a new Codeforces problem manually
 * 
 * Instructions:
 * 1. Copy this file to data/codeforces/your_problem_slug.ts
 * 2. Rename the export constant (e.g., YOUR_PROBLEM_NAME)
 * 3. Fill in all the fields below
 * 4. Import and add to CODEFORCES_PROBLEMS array in data/codeforces.ts
 */

export const TEMPLATE_PROBLEM: Problem = {
  // Format: "cf_{problem_code}_{snake_case_title}"
  id: "cf_800a_example_problem",
  
  // The problem title
  title: "Example Problem",
  
  // Must be one of: "Easy", "Medium", "Hard"
  difficulty: "Medium",
  
  // Codeforces-specific categories:
  // "Implementation", "Greedy", "Math", "Constructive", "Brute Force",
  // "Data Structures", "Graphs", "Number Theory", "String", "Sortings",
  // "Binary Search", "DFS and Similar", "Trees", "Combinatorics"
  tags: ["Implementation", "Math"],
  
  // The problem description in markdown format
  descriptionMarkdown: `# Problem Title

Brief description of the problem goes here.

You can use **bold** and *italic* text, as well as \`inline code\`.

## Input

Description of the input format.

## Output

Description of the output format.

## Example

**Input:**
\`\`\`
5
1 2 3 4 5
\`\`\`

**Output:**
\`\`\`
15
\`\`\`

## Explanation

Explain why this is the output.

## Constraints

- \`1 <= n <= 10^5\`
- Time limit: 1 second
- Memory limit: 256 megabytes
`,

  // The solution explanation (appears before code)
  solutionExplanation: `**Approach:** Explain the solution strategy.

**Key Insights:**
- Point 1
- Point 2

**Algorithm Steps:**
1. Step 1
2. Step 2
3. Step 3`,

  // The actual code to type (use realistic indentation)
  solutionCode: `def solve():
    n = int(input())
    arr = list(map(int, input().split()))
    
    result = sum(arr)
    print(result)

solve()`,

  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  
  platform: "codeforces",
};
