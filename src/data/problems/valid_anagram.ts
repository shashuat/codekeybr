import { Problem } from '../../types';

export const VALID_ANAGRAM: Problem = {
  "id": "242_valid_anagram",
  "title": "Valid Anagram",
  "difficulty": "Easy",
  "tags": ["Hash Table", "String", "Sorting"],
  "descriptionMarkdown": `# Valid Anagram

Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

## Example 1:

**Input:** s = "anagram", t = "nagaram"
**Output:** true

## Example 2:

**Input:** s = "rat", t = "car"
**Output:** false

## Constraints:

- \`1 <= s.length, t.length <= 5 * 10^4\`
- \`s\` and \`t\` consist of lowercase English letters.`,
  "solutionExplanation": `# Solution

We can use a **Hash Map** (or Counter) to count the frequency of each character in both strings.

First, check if the strings have the same length - if not, they can't be anagrams.
Then, count the frequency of each character in the first string. 
Finally, iterate through the second string and decrement the counts. If we encounter a character that doesn't exist or has a count of 0, it's not an anagram.`,
  "solutionCode": `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        
        count = {}
        for char in s:
            count[char] = count.get(char, 0) + 1
        
        for char in t:
            if char not in count or count[char] == 0:
                return False
            count[char] -= 1
        
        return True`,
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)",
  "platform": "leetcode"
};
