import { Problem } from '../../types';

export const LETTER_COMBINATIONS_OF_A_PHONE_NUMBER: Problem = {
  "id": "17_letter_combinations_of_a_phone_number",
  "title": "Letter Combinations of a Phone Number",
  "difficulty": "Medium",
  "tags": [
    "Hash Table",
    "String",
    "Backtracking",
    "DFS"
  ],
  "descriptionMarkdown": "Given a string containing digits from 2\u20139 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.\n\nA mapping of digits to letters (as on telephone buttons) is used; note that 1 does not map to any letters.\n\nExample 1:\n- Input: digits = \"23\"\n- Output: [\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]\n\nExample 2:\n- Input: digits = \"2\"\n- Output: [\"a\",\"b\",\"c\"]\n\nConstraints:\n- 1 <= digits.length <= 4\n- digits[i] is in ['2', '9']",
  "solutionExplanation": "This is a combinatorial generation problem that fits naturally with depth-first search (DFS) backtracking. Maintain a mapping from each digit to its corresponding letters. Recursively build combinations by choosing one letter for the current digit and proceeding to the next digit. When the path length equals the number of digits, record the formed string.\n\nTo keep it efficient, use a preallocated list of characters for the current path and join it only when a full combination is formed. This avoids repeated string concatenations. Handle the edge case of an empty input by returning an empty list immediately.",
  "solutionCode": "from typing import List\n\nclass Solution:\n    def letterCombinations(self, digits: str) -> List[str]:\n        if not digits:\n            return []\n        mapping = {\n            '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',\n            '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'\n        }\n        res: List[str] = []\n        path = [''] * len(digits)\n\n        def dfs(i: int) -> None:\n            if i == len(digits):\n                res.append(''.join(path))\n                return\n            for ch in mapping[digits[i]]:\n                path[i] = ch\n                dfs(i + 1)\n\n        dfs(0)\n        return res",
  "timeComplexity": "O(3^a * 4^b)",
  "spaceComplexity": "O(n) auxiliary; O(k) including output"
};
