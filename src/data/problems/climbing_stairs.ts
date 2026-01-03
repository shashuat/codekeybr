import { Problem } from '../../types';

export const CLIMBING_STAIRS: Problem = {
  "id": "70_climbing_stairs",
  "title": "Climbing Stairs",
  "difficulty": "Easy",
  "tags": [
    "Dynamic Programming",
    "Math"
  ],
  "descriptionMarkdown": "You are climbing a staircase. It takes n steps to reach the top.\n\nEach time you can climb either 1 or 2 steps. In how many distinct ways can you reach the top?\n\nExample 1:\n```\nInput: n = 2\nOutput: 2\nExplanation:\n1) 1 step + 1 step\n2) 2 steps\n```\n\nExample 2:\n```\nInput: n = 3\nOutput: 3\nExplanation:\n1) 1 + 1 + 1\n2) 1 + 2\n3) 2 + 1\n```\n\nConstraints:\n- 1 <= n <= 45",
  "solutionExplanation": "This is a classic dynamic programming problem that maps directly to the Fibonacci sequence. Let f(n) be the number of ways to reach step n. To get to step n, you must come from either step n-1 (taking 1 step) or step n-2 (taking 2 steps). Therefore, f(n) = f(n-1) + f(n-2), with base cases f(1) = 1 and f(2) = 2.\n\nWe can compute this iteratively using two variables to store the last two results, achieving O(1) extra space. This avoids recursion overhead and memoization storage while remaining linear in time.",
  "solutionCode": "class Solution:\n    def climbStairs(self, n: int) -> int:\n        if n <= 2:\n            return n\n        a, b = 1, 2  # f(1), f(2)\n        for _ in range(3, n + 1):\n            a, b = b, a + b\n        return b\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)"
};
