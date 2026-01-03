import { Problem } from '../../types';

export const VALID_PARENTHESES: Problem = {
  "id": "20_valid_parentheses",
  "title": "Valid Parentheses",
  "difficulty": "Easy",
  "tags": [
    "Stack",
    "String"
  ],
  "descriptionMarkdown": "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the string is valid.\n\nA string is valid if:\n- Open brackets are closed by the same type of brackets.\n- Open brackets are closed in the correct order.\n- Every close bracket has a corresponding open bracket of the same type.\n\nExamples:\n- Input: s = \"()\"  -> Output: true\n- Input: s = \"()[]{}\"  -> Output: true\n- Input: s = \"(]\"  -> Output: false\n- Input: s = \"([])\"  -> Output: true\n- Input: s = \"([)]\"  -> Output: false\n\nConstraints:\n- 1 <= s.length <= 1e4\n- s consists only of the characters ()[]{}.",
  "solutionExplanation": "Use a stack to track opening brackets and a map from closing to opening brackets. Iterate through the string: push any opening bracket onto the stack; for a closing bracket, check that the stack is not empty and that the top of the stack matches the corresponding opening bracket. If not, return false. At the end, the stack must be empty for the string to be valid.\n\nAn early optimization: if the string length is odd, it cannot be valid because brackets must come in pairs. This approach ensures each character is processed once and matched correctly.",
  "solutionCode": "class Solution:\n    def isValid(self, s: str) -> bool:\n        # Early exit: odd length cannot be fully matched\n        if len(s) % 2 == 1:\n            return False\n\n        pairs = {\")\": \"(\", \"]\": \"[\", \"}\": \"{\"\n        }\n        stack = []\n\n        for ch in s:\n            if ch in \"([{\":\n                stack.append(ch)\n            else:\n                if not stack or stack[-1] != pairs.get(ch):\n                    return False\n                stack.pop()\n\n        return not stack",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(N)"
};
