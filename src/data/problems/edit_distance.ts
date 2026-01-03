import { Problem } from '../../types';

export const EDIT_DISTANCE: Problem = {
  "id": "72_edit_distance",
  "title": "Edit Distance",
  "difficulty": "Medium",
  "tags": [
    "Dynamic Programming",
    "String"
  ],
  "descriptionMarkdown": "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.\n\nAllowed operations:\n- Insert a character\n- Delete a character\n- Replace a character\n\nExample 1:\nInput: word1 = \"horse\", word2 = \"ros\"\nOutput: 3\nExplanation:\nhorse -> rorse (replace 'h' with 'r')\nrorse -> rose (delete 'r')\nrose -> ros (delete 'e')\n\nExample 2:\nInput: word1 = \"intention\", word2 = \"execution\"\nOutput: 5\nExplanation:\nintention -> inention (delete 't')\ninention -> enention (replace 'i' with 'e')\nenention -> exention (replace 'n' with 'x')\nexention -> exection (replace 'n' with 'c')\nexection -> execution (insert 'u')\n\nConstraints:\n- 0 <= word1.length, word2.length <= 500\n- word1 and word2 consist of lowercase English letters.",
  "solutionExplanation": "Use dynamic programming where dp[i][j] is the minimum edits to convert the first i characters of word1 to the first j characters of word2. Base cases: dp[i][0] = i (delete all i chars) and dp[0][j] = j (insert j chars). For i, j > 0: if word1[i-1] == word2[j-1], dp[i][j] = dp[i-1][j-1]; otherwise dp[i][j] = 1 + min(dp[i-1][j] delete, dp[i][j-1] insert, dp[i-1][j-1] replace).\n\nTo optimize space, keep only one row (the previous row) and update it in place while tracking the diagonal value (dp[i-1][j-1]) with a temporary variable. This reduces space from O(m\u00b7n) to O(min(m, n)) by making the shorter string the columns.",
  "solutionCode": "class Solution:\n    def minDistance(self, word1: str, word2: str) -> int:\n        # Ensure the second string is the shorter one to minimize space\n        if len(word2) > len(word1):\n            word1, word2 = word2, word1\n        m, n = len(word1), len(word2)\n        # dp[j] = edit distance between word1[:i] and word2[:j] for current i\n        dp = list(range(n + 1))  # dp[0..n] initialized for i = 0\n        for i in range(1, m + 1):\n            prev_diag = dp[0]  # dp[i-1][0]\n            dp[0] = i          # dp[i][0] = i (all deletions)\n            for j in range(1, n + 1):\n                temp = dp[j]   # store dp[i-1][j] before overwrite\n                if word1[i - 1] == word2[j - 1]:\n                    dp[j] = prev_diag\n                else:\n                    dp[j] = 1 + min(\n                        dp[j],       # delete from word1:    dp[i-1][j]\n                        dp[j - 1],   # insert into word1:    dp[i][j-1]\n                        prev_diag    # replace last char:     dp[i-1][j-1]\n                    )\n                prev_diag = temp  # move diagonal for next j\n        return dp[n]\n",
  "timeComplexity": "O(m * n)",
  "spaceComplexity": "O(min(m, n))"
};
