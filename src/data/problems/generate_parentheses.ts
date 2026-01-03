import { Problem } from '../../types';

export const GENERATE_PARENTHESES: Problem = {
  "id": "22_generate_parentheses",
  "title": "Generate Parentheses",
  "difficulty": "Medium",
  "tags": [
    "Backtracking",
    "DFS"
  ],
  "descriptionMarkdown": "Given n pairs of parentheses, generate all combinations of well-formed parentheses.\n\nExample 1:\n```\nInput: n = 3\nOutput: [\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]\n```\n\nExample 2:\n```\nInput: n = 1\nOutput: [\"()\"]\n```\n\nConstraints:\n- 1 <= n <= 8",
  "solutionExplanation": "Use backtracking (DFS) to build the string one character at a time while maintaining two counters: the number of opening and closing parentheses used so far. You can add an opening parenthesis if you still have some left (open < n). You can add a closing parenthesis only if it will not invalidate the string (close < open). When the current path reaches length 2n, it forms a valid sequence.\n\nThis approach prunes invalid paths early, ensuring we only explore valid constructions. The total number of valid sequences is given by the nth Catalan number, so any optimal solution will inherently generate all of them. The algorithm is efficient in practice and uses only O(n) auxiliary space for recursion and the current path.",
  "solutionCode": "from typing import List\n\nclass Solution:\n    def generateParenthesis(self, n: int) -> List[str]:\n        res: List[str] = []\n        path: List[str] = []\n\n        def backtrack(open_count: int, close_count: int) -> None:\n            if len(path) == 2 * n:\n                res.append(''.join(path))\n                return\n            if open_count < n:\n                path.append('(')\n                backtrack(open_count + 1, close_count)\n                path.pop()\n            if close_count < open_count:\n                path.append(')')\n                backtrack(open_count, close_count + 1)\n                path.pop()\n\n        backtrack(0, 0)\n        return res",
  "timeComplexity": "O(C_n * n), where C_n is the nth Catalan number",
  "spaceComplexity": "O(n) auxiliary space (O(C_n * n) including the output)"
};
