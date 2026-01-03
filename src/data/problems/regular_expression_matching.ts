import { Problem } from '../../types';

export const REGULAR_EXPRESSION_MATCHING: Problem = {
  "id": "10_regular_expression_matching",
  "title": "Regular Expression Matching",
  "difficulty": "Hard",
  "tags": [
    "String",
    "Dynamic Programming",
    "Recursion"
  ],
  "descriptionMarkdown": "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:\n\n- '.' matches any single character\n- '*' matches zero or more of the preceding element\n\nThe matching must cover the entire input string (not partial).\n\nExamples:\n\n- Example 1:\n  - Input: s = \"aa\", p = \"a\"\n  - Output: false\n  - Explanation: \"a\" does not match the entire string \"aa\".\n\n- Example 2:\n  - Input: s = \"aa\", p = \"a*\"\n  - Output: true\n  - Explanation: '*' means zero or more of the preceding element, 'a'. Repeating 'a' once forms \"aa\".\n\n- Example 3:\n  - Input: s = \"ab\", p = \".*\"\n  - Output: true\n  - Explanation: \".*\" means \"zero or more (*) of any character (.)\".\n\nConstraints:\n- 1 <= s.length <= 20\n- 1 <= p.length <= 20\n- s contains only lowercase English letters\n- p contains only lowercase English letters, '.', and '*'\n- Every '*' has a valid preceding character",
  "solutionExplanation": "Use dynamic programming over suffixes of s and p. Let dp[i][j] indicate whether s[i:] matches p[j:]. The core cases are: (1) if p[j+1] is '*', we can either skip the \"x*\" (dp[i][j+2]) or, if the current characters match, consume one character from s and stay on the same pattern position (dp[i+1][j]); (2) otherwise, we require the current characters to match and move both pointers forward (dp[i+1][j+1]). A character match is true when p[j] equals s[i] or p[j] is '.'.\n\nA concise and efficient way to implement this is top-down recursion with memoization (or bottom-up DP). Memoization ensures each (i, j) state is computed once, yielding O(mn) time where m = len(s) and n = len(p). The approach naturally handles leading constructs like a*, a*b*, etc., and enforces full-string matching by requiring the pattern to be fully consumed when the string ends.",
  "solutionCode": "from functools import lru_cache\n\nclass Solution:\n    def isMatch(self, s: str, p: str) -> bool:\n        m, n = len(s), len(p)\n\n        @lru_cache(maxsize=None)\n        def dfs(i: int, j: int) -> bool:\n            if j == n:\n                return i == m\n            first_match = i < m and (p[j] == s[i] or p[j] == '.')\n            if j + 1 < n and p[j + 1] == '*':\n                # Skip the \"x*\" or use it if first matches\n                return dfs(i, j + 2) or (first_match and dfs(i + 1, j))\n            else:\n                return first_match and dfs(i + 1, j + 1)\n\n        return dfs(0, 0)\n",
  "timeComplexity": "O(m*n)",
  "spaceComplexity": "O(m*n)",
  "platform": "leetcode"
};
