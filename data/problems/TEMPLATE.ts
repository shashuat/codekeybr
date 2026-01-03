import { Problem } from '../../types';

/**
 * TEMPLATE: Copy this file to create a new problem manually
 * 
 * Instructions:
 * 1. Copy this file to data/problems/your_problem_slug.ts
 * 2. Rename the export constant (e.g., YOUR_PROBLEM_NAME)
 * 3. Fill in all the fields below
 * 4. Import and add to PROBLEMS array in data/problems.ts
 */

export const TEMPLATE_PROBLEM: Problem = {
  // Format: "{leetcode_number}_{snake_case_title}"
  id: "123_example_problem",
  
  // The problem title
  title: "Example Problem",
  
  // Must be one of: "Easy", "Medium", "Hard"
  difficulty: "Medium",
  
  // Categories/topics - common ones:
  // "Array", "String", "Hash Table", "Two Pointers", "Sliding Window",
  // "Binary Search", "Stack", "Queue", "Linked List", "Tree", "Graph",
  // "Dynamic Programming", "Backtracking", "Greedy", "Sorting", "Math"
  tags: ["Array", "Hash Table"],
  
  // The problem description in markdown format
  // Use backticks for code, ** for bold, * for italic
  descriptionMarkdown: `# Problem Title

Brief description of the problem goes here.

You can use **bold** and *italic* text, as well as \`inline code\`.

## Example 1:

**Input:** nums = [1,2,3]
**Output:** [1,2]
**Explanation:** Explain why this is the output.

## Example 2:

**Input:** nums = [4,5,6]
**Output:** [4,5]

## Constraints:

- \`1 <= nums.length <= 10^4\`
- \`-10^9 <= nums[i] <= 10^9\`
- Add more constraints here
`,

  // Explanation of the solution approach (2-4 paragraphs)
  // This is what users will type FIRST
  solutionExplanation: `# Solution

Start with a brief overview of the optimal approach.

Explain the key insight or technique needed (e.g., "We can use a Hash Map to...").

Describe the algorithm step by step, explaining the logic behind each step.

You can use math notation with $ for inline: $O(n)$ or $$ for blocks:

$$
f(n) = f(n-1) + f(n-2)
$$
`,

  // The actual code solution in Python (what users will type)
  // Keep it clean and idiomatic
  solutionCode: `class Solution:
    def methodName(self, param1: List[int], param2: int) -> List[int]:
        # Initialize data structures
        result = []
        hashmap = {}
        
        # Main algorithm logic
        for i, num in enumerate(param1):
            if num in hashmap:
                result.append(hashmap[num])
            hashmap[num] = i
        
        return result`,
  
  // Big O time complexity
  // Common values: "O(1)", "O(log N)", "O(N)", "O(N log N)", "O(N^2)", "O(2^N)"
  timeComplexity: "O(N)",
  
  // Big O space complexity
  // Common values: "O(1)", "O(N)", "O(N^2)"
  spaceComplexity: "O(N)"
};
