import { Problem } from '../../types';

export const MINIMUM_PATH_SUM: Problem = {
  "id": "64_minimum_path_sum",
  "title": "Minimum Path Sum",
  "difficulty": "Medium",
  "tags": [
    "Array",
    "Dynamic Programming",
    "Matrix"
  ],
  "descriptionMarkdown": "Given an m x n grid filled with non-negative numbers, find a path from the top-left to the bottom-right that minimizes the sum of all numbers along its path.\n\nNote: You can only move either down or right at any point in time.\n\nExample 1:\nInput: grid = [[1,3,1],[1,5,1],[4,2,1]]\nOutput: 7\nExplanation: The path 1 \u2192 3 \u2192 1 \u2192 1 \u2192 1 minimizes the sum.\n\nExample 2:\nInput: grid = [[1,2,3],[4,5,6]]\nOutput: 12\n\nConstraints:\n- m == grid.length\n- n == grid[i].length\n- 1 <= m, n <= 200\n- 0 <= grid[i][j] <= 200",
  "solutionExplanation": "This is a classic dynamic programming problem on a grid. Let dp[i][j] be the minimum path sum to reach cell (i, j). The recurrence is dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]) because we can arrive from the top or from the left. The first row and first column are initialized by cumulative sums since only one direction is possible along edges.\n\nTo optimize space, we use a 1D array dp of length n (number of columns). dp[j] represents the minimum path sum to reach the current row's column j. We update in-place from left to right: dp[j] = min(dp[j] (from above), dp[j-1] (from left)) + grid[i][j], handling the first row and first column as base cases.\n\nThis approach runs in O(mn) time and uses O(n) extra space, which is optimal without modifying the input grid.",
  "solutionCode": "from typing import List\n\nclass Solution:\n    def minPathSum(self, grid: List[List[int]]) -> int:\n        m, n = len(grid), len(grid[0])\n        dp = [0] * n\n        # Initialize first row\n        dp[0] = grid[0][0]\n        for j in range(1, n):\n            dp[j] = dp[j - 1] + grid[0][j]\n        # Iterate over remaining rows\n        for i in range(1, m):\n            dp[0] += grid[i][0]  # first column accumulates from above\n            for j in range(1, n):\n                dp[j] = min(dp[j], dp[j - 1]) + grid[i][j]\n        return dp[-1]\n",
  "timeComplexity": "O(m*n)",
  "spaceComplexity": "O(n)"
};
