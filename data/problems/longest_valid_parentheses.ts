import { Problem } from '../../types';

export const LONGEST_VALID_PARENTHESES: Problem = {
  "id": "32_longest_valid_parentheses",
  "title": "Longest Valid Parentheses",
  "difficulty": "Hard",
  "tags": [
    "Stack",
    "Dynamic Programming",
    "Two Pointers",
    "String"
  ],
  "descriptionMarkdown": "Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses substring.\n\nExamples:\n\n- Input: `s = \"(()\"`\n  Output: `2`\n  Explanation: The longest valid parentheses substring is `\"()\"`.\n\n- Input: `s = \")()())\"`\n  Output: `4`\n  Explanation: The longest valid parentheses substring is `\"()()\"`.\n\n- Input: `s = \"\"`\n  Output: `0`\n\nConstraints:\n- `0 <= s.length <= 3 * 10^4`\n- `s[i]` is `'('` or `')'`.",
  "solutionExplanation": "A space-optimal approach uses two linear scans with counters. In the left-to-right scan, maintain counts of left and right parentheses. Each time they are equal, update the best length with 2 * right. If right ever exceeds left, reset both counters (since a valid substring cannot start before that point). This finds all valid substrings where there are never more '(' than ')' when scanning left-to-right.\n\nHowever, cases with extra '(' at the beginning (e.g., \"(()\") are missed by the first pass. A second scan from right-to-left fixes this symmetrically: count left and right again, update when equal, and reset when left exceeds right. The maximum across both scans is the answer.\n\nThis method runs in linear time and constant extra space. Alternative solutions include using a stack of indices or dynamic programming; both are also O(n) but use O(n) space.",
  "solutionCode": "class Solution:\n    def longestValidParentheses(self, s: str) -> int:\n        maxlen = 0\n        left = right = 0\n        # Left to right\n        for ch in s:\n            if ch == '(': \n                left += 1\n            else:\n                right += 1\n            if left == right:\n                maxlen = max(maxlen, 2 * right)\n            elif right > left:\n                left = right = 0\n        # Right to left\n        left = right = 0\n        for ch in reversed(s):\n            if ch == ')':\n                right += 1\n            else:\n                left += 1\n            if left == right:\n                maxlen = max(maxlen, 2 * left)\n            elif left > right:\n                left = right = 0\n        return maxlen",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)"
};
