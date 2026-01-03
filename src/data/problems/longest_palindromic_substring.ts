import { Problem } from '../../types';

export const LONGEST_PALINDROMIC_SUBSTRING: Problem = {
  "id": "5_longest_palindromic_substring",
  "title": "Longest Palindromic Substring",
  "difficulty": "Medium",
  "tags": [
    "Two Pointers",
    "String",
    "Dynamic Programming"
  ],
  "descriptionMarkdown": "Given a string s, return the longest palindromic substring in s.\n\nExample 1:\nInput: s = \"babad\"\nOutput: \"bab\"\nExplanation: \"aba\" is also a valid answer.\n\nExample 2:\nInput: s = \"cbbd\"\nOutput: \"bb\"\n\nConstraints:\n- 1 <= s.length <= 1000\n- s consists of only digits and English letters.",
  "solutionExplanation": "A practical approach is to expand around every possible palindrome center. A palindrome is defined by its center; for each index, we consider two centers: one for odd-length palindromes (center at i) and one for even-length palindromes (center between i and i+1). From each center, expand outward while the characters match, tracking the longest span found.\n\nThis method examines O(N) centers and each expansion can traverse at most O(N) characters across the string, resulting in O(N^2) time in the worst case. It uses O(1) extra space and is simpler than dynamic programming (which also takes O(N^2) time but O(N^2) space). While Manacher's algorithm achieves O(N) time, the center-expansion solution is concise, robust, and sufficient for typical interview constraints.",
  "solutionCode": "class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        if not s:\n            return \"\"\n\n        start = 0\n        end = 0\n        n = len(s)\n\n        def expand(l: int, r: int) -> tuple[int, int]:\n            while l >= 0 and r < n and s[l] == s[r]:\n                l -= 1\n                r += 1\n            # Return the palindrome's inclusive bounds after overshoot\n            return l + 1, r - 1\n\n        for i in range(n):\n            l1, r1 = expand(i, i)       # odd-length center\n            l2, r2 = expand(i, i + 1)   # even-length center\n\n            if r1 - l1 > end - start:\n                start, end = l1, r1\n            if r2 - l2 > end - start:\n                start, end = l2, r2\n\n        return s[start:end + 1]\n",
  "timeComplexity": "O(N^2)",
  "spaceComplexity": "O(1)",
  "platform": "leetcode"
};
