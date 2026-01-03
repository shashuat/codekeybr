import { Problem } from '../../types';

export const NEXT_PERMUTATION: Problem = {
  "id": "31_next_permutation",
  "title": "Next Permutation",
  "difficulty": "Medium",
  "tags": [
    "Array",
    "Two Pointers"
  ],
  "descriptionMarkdown": "A permutation of an array of integers is an arrangement of its members into a sequence or linear order.\n\n- For example, for `arr = [1,2,3]`, the permutations include: `[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]`.\n\nThe next permutation of an array of integers is the next lexicographically greater arrangement of its numbers. If all permutations are sorted lexicographically, the next permutation is the one that follows the current arrangement. If no such arrangement exists, rearrange the array into the lowest possible order (ascending).\n\n- Example: next permutation of `[1,2,3]` is `[1,3,2]`.\n- Example: next permutation of `[2,3,1]` is `[3,1,2]`.\n- Example: next permutation of `[3,2,1]` is `[1,2,3]` (highest to lowest wraps to smallest).\n\nGiven an array `nums`, modify it in place to become its next permutation using only constant extra memory.\n\nConstraints:\n- `1 <= nums.length <= 100`\n- `0 <= nums[i] <= 100`",
  "solutionExplanation": "The key observation is that the next permutation changes the longest non-increasing suffix into the smallest greater arrangement. Scan from right to left to find the first index `i` where `nums[i] < nums[i+1]`; this is the pivot. If no such index exists, the sequence is entirely non-increasing and already the highest permutation\u2014reversing it yields the lowest order (ascending).\n\nIf a pivot exists, find the smallest element greater than `nums[i]` to its right by scanning from the end (the rightmost successor) and swap them. Finally, reverse the suffix starting at `i + 1` to make it the smallest (ascending) arrangement. This ensures the result is the next lexicographically greater permutation with minimal change.",
  "solutionCode": "from typing import List\n\nclass Solution:\n    def nextPermutation(self, nums: List[int]) -> None:\n        \"\"\"\n        Do not return anything, modify nums in-place instead.\n        \"\"\"\n        n = len(nums)\n        # 1) Find the first index i from the right such that nums[i] < nums[i+1]\n        i = n - 2\n        while i >= 0 and nums[i] >= nums[i + 1]:\n            i -= 1\n\n        # 2) If such index exists, find rightmost element greater than nums[i] and swap\n        if i >= 0:\n            j = n - 1\n            while nums[j] <= nums[i]:\n                j -= 1\n            nums[i], nums[j] = nums[j], nums[i]\n\n        # 3) Reverse the suffix starting at i + 1\n        left, right = i + 1, n - 1\n        while left < right:\n            nums[left], nums[right] = nums[right], nums[left]\n            left += 1\n            right -= 1\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)"
};
