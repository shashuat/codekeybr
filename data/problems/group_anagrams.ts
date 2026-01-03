import { Problem } from '../../types';

export const GROUP_ANAGRAMS: Problem = {
  "id": "49_group_anagrams",
  "title": "Group Anagrams",
  "difficulty": "Medium",
  "tags": [
    "Array",
    "Hash Table",
    "String",
    "Sorting"
  ],
  "descriptionMarkdown": "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.\n\nExamples\n\nExample 1:\nInput: strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]\nOutput: [[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]\nExplanation:\n- There is no string in strs that can be rearranged to form \"bat\".\n- The strings \"nat\" and \"tan\" are anagrams as they can be rearranged to form each other.\n- The strings \"ate\", \"eat\", and \"tea\" are anagrams as they can be rearranged to form each other.\n\nExample 2:\nInput: strs = [\"\"]\nOutput: [[\"\"]]\n\nExample 3:\nInput: strs = [\"a\"]\nOutput: [[\"a\"]]\n\nConstraints\n- 1 <= strs.length <= 10^4\n- 0 <= strs[i].length <= 100\n- strs[i] consists of lowercase English letters.",
  "solutionExplanation": "Use a hash map to group words by an anagram signature. Instead of sorting each string (which costs O(L log L) per string), build a fixed-size frequency signature: a 26-length tuple counting letters 'a' to 'z'. All anagrams share the same frequency tuple, so they map to the same bucket.\n\nIterate over each string, compute its 26-count tuple, and append the string to the list at that key in the map. This reduces per-string processing to O(L), where L is the string length, leading to an overall O(N * L) time. Finally, return the hash map values as the grouped anagrams.\n\nThis approach is optimal for lowercase English letters because the signature size is constant (26), making key construction and hashing efficient while avoiding the overhead of sorting.",
  "solutionCode": "from typing import List\nfrom collections import defaultdict\n\nclass Solution:\n    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:\n        groups = defaultdict(list)\n        for s in strs:\n            count = [0] * 26\n            for ch in s:\n                count[ord(ch) - ord('a')] += 1\n            groups[tuple(count)].append(s)\n        return list(groups.values())\n",
  "timeComplexity": "O(N * L)",
  "spaceComplexity": "O(N * L)"
};
