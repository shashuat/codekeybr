import { Problem } from '../../types';

export const UNIQUE_PATHS: Problem = {
  "id": "62_unique_paths",
  "title": "Unique Paths",
  "difficulty": "Medium",
  "tags": [
    "Dynamic Programming",
    "Math",
    "Combinatorics"
  ],
  "descriptionMarkdown": "There is a robot on an m x n grid. The robot starts at the top-left corner (grid[0][0]) and wants to reach the bottom-right corner (grid[m-1][n-1]). It can only move either down or right at any time.\n\nGiven integers m and n, return the number of unique paths the robot can take to reach the bottom-right corner.\n\nThe test cases are generated so that the answer is \u2264 2 \u00d7 10^9.\n\nExamples:\n\nExample 1:\n\nInput: m = 3, n = 7\nOutput: 28\n\nExample 2:\n\nInput: m = 3, n = 2\nOutput: 3\nExplanation:\nFrom the top-left corner, there are 3 ways to reach the bottom-right corner:\n1. Right -> Down -> Down\n2. Down -> Down -> Right\n3. Down -> Right -> Down\n\nConstraints:\n- 1 <= m, n <= 100",
  "solutionExplanation": "Each valid path from the top-left to bottom-right consists of exactly (m\u22121) moves down and (n\u22121) moves right, in some order. Thus the problem reduces to counting how many distinct ways we can arrange these moves. This is the binomial coefficient C(m+n\u22122, m\u22121) (equivalently C(m+n\u22122, n\u22121)).\n\nTo compute this efficiently and without floating-point error, we use a multiplicative formula for combinations: iterate i from 1 to k where k = min(m\u22121, n\u22121), and maintain res = res * (total \u2212 k + i) // i where total = m + n \u2212 2. This keeps the intermediate results integral and small. The time complexity is O(min(m, n)) and space is O(1).\n\nAlternative DP: We could use a 2D or 1D DP where dp[i][j] = dp[i\u22121][j] + dp[i][j\u22121], but the combinatorial approach is simpler and faster here.",
  "solutionCode": "class Solution:\n    def uniquePaths(self, m: int, n: int) -> int:\n        # Total moves: (m-1) downs and (n-1) rights\n        total = m + n - 2\n        k = min(m - 1, n - 1)  # choose the smaller to minimize iterations\n        res = 1\n        for i in range(1, k + 1):\n            res = res * (total - k + i) // i\n        return res",
  "timeComplexity": "O(min(m, n))",
  "spaceComplexity": "O(1)"
};
