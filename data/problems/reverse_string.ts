import { Problem } from '../../types';

export const REVERSE_STRING: Problem = {
  "id": "344_reverse_string",
  "title": "Reverse String",
  "difficulty": "Easy",
  "tags": ["Two Pointers", "String"],
  "descriptionMarkdown": `# Reverse String

Write a function that reverses a string. The input string is given as an array of characters \`s\`.

You must do this by modifying the input array **in-place** with \`O(1)\` extra memory.

## Example 1:

**Input:** s = ["h","e","l","l","o"]
**Output:** ["o","l","l","e","h"]

## Example 2:

**Input:** s = ["H","a","n","n","a","h"]
**Output:** ["h","a","n","n","a","H"]`,
  "solutionExplanation": `# Solution

We can use the **Two Pointers** approach. 

One pointer, \`left\`, starts at the beginning of the array, and the other pointer, \`right\`, starts at the end. 
We swap the characters at these pointers and move them towards each other until they meet in the middle.`,
  "solutionCode": `class Solution:
    def reverseString(self, s: List[str]) -> None:
        left, right = 0, len(s) - 1
        while left < right:
            s[left], s[right] = s[right], s[left]
            left += 1
            right -= 1`,
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)",
  "platform": "leetcode"
};
