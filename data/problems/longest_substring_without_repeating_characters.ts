import { Problem } from '../../types';

export const LONGEST_SUBSTRING_WITHOUT_REPEATING_CHARACTERS: Problem = {
  "id": "3_longest_substring_without_repeating_characters",
  "title": "Longest Substring Without Repeating Characters",
  "difficulty": "Medium",
  "tags": [
    "Hash Table",
    "Sliding Window",
    "Two Pointers"
  ],
  "descriptionMarkdown": "Given a string `s`, find the length of the longest substring without duplicate characters.\n\nExamples:\n\n- Example 1:\n  - Input: `s = \"abcabcbb\"`\n  - Output: `3`\n  - Explanation: The answer is `\"abc\"` with length 3. `\"bca\"` and `\"cab\"` are also valid.\n\n- Example 2:\n  - Input: `s = \"bbbbb\"`\n  - Output: `1`\n  - Explanation: The answer is `\"b\"` with length 1.\n\n- Example 3:\n  - Input: `s = \"pwwkew\"`\n  - Output: `3`\n  - Explanation: The answer is `\"wke\"` with length 3. Note that the answer must be a substring; `\"pwke\"` is a subsequence, not a substring.\n\nConstraints:\n- `0 <= s.length <= 5 * 10^4`\n- `s` consists of English letters, digits, symbols, and spaces.",
  "solutionExplanation": "Use a sliding window with two pointers and a hash map that stores the last seen index of each character. Expand the right pointer over the string; when a character repeats within the current window, move the left pointer to one position after the previous occurrence to ensure the window remains duplicate-free. Track the maximum window size encountered.\n\nThis approach is optimal because each character index is processed at most twice: once when the right pointer visits it and potentially once when the left pointer jumps past it. The hash map provides O(1) lookups and updates, enabling linear time complexity.",
  "solutionCode": "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        last_index = {}\n        left = 0\n        best = 0\n        for right, ch in enumerate(s):\n            if ch in last_index and last_index[ch] >= left:\n                left = last_index[ch] + 1\n            last_index[ch] = right\n            best = max(best, right - left + 1)\n        return best\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(min(N, alphabet))",
  "platform": "leetcode"
};
