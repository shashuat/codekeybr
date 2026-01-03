import { Problem } from '../../types';

export const MINIMUM_WINDOW_SUBSTRING: Problem = {
  "id": "76_minimum_window_substring",
  "title": "Minimum Window Substring",
  "difficulty": "Hard",
  "tags": [
    "Hash Table",
    "Two Pointers",
    "Sliding Window",
    "String"
  ],
  "descriptionMarkdown": "Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string \"\".\n\nThe test cases are generated such that the answer is unique.\n\nExamples:\n\n- Example 1:\n  Input: s = \"ADOBECODEBANC\", t = \"ABC\"\n  Output: \"BANC\"\n  Explanation: The minimum window substring \"BANC\" includes 'A', 'B', and 'C' from t.\n\n- Example 2:\n  Input: s = \"a\", t = \"a\"\n  Output: \"a\"\n  Explanation: The entire string s is the minimum window.\n\n- Example 3:\n  Input: s = \"a\", t = \"aa\"\n  Output: \"\"\n  Explanation: Both 'a's from t must be included in the window. Since s has only one 'a', return empty string.\n\nConstraints:\n- m == s.length\n- n == t.length\n- 1 <= m, n <= 1e5\n- s and t consist of uppercase and lowercase English letters.\n\nFollow-up: Can you find an algorithm that runs in O(m + n) time?",
  "solutionExplanation": "Use a sliding window with two pointers and frequency counting. First count the required frequency of each character in t. Expand the right pointer over s, adding characters to the current window count. When the window contains all required characters with at least the needed counts, try to shrink it from the left to find a smaller valid window, updating the best answer whenever a smaller valid window is found.\n\nMaintain a variable \"formed\" that counts how many unique characters have met their required counts. When expanding, if the count of a character matches the required count, increment formed. While formed equals the number of unique characters in t, contract from the left, decrementing counts and reducing formed if a required character falls below its needed frequency. This guarantees O(m + n) time since each pointer moves at most m steps.\n\nSpace is bounded by the alphabet size since s and t contain only English letters, so auxiliary space is constant.",
  "solutionCode": "from collections import Counter\n\nclass Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        if not s or not t:\n            return \"\"\n\n        need = Counter(t)\n        required = len(need)\n\n        l = 0\n        formed = 0\n        window = {}\n\n        best_len = float('inf')\n        best_l = 0\n        best_r = 0\n\n        for r, ch in enumerate(s):\n            window[ch] = window.get(ch, 0) + 1\n            if ch in need and window[ch] == need[ch]:\n                formed += 1\n\n            while l <= r and formed == required:\n                if r - l + 1 < best_len:\n                    best_len = r - l + 1\n                    best_l, best_r = l, r\n\n                left_ch = s[l]\n                window[left_ch] = window.get(left_ch, 0) - 1\n                if left_ch in need and window[left_ch] < need[left_ch]:\n                    formed -= 1\n                l += 1\n\n        return \"\" if best_len == float('inf') else s[best_l:best_r+1]\n",
  "timeComplexity": "O(m + n)",
  "spaceComplexity": "O(1)"
};
