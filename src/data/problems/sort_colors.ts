import { Problem } from '../../types';

export const SORT_COLORS: Problem = {
  "id": "75_sort_colors",
  "title": "Sort Colors",
  "difficulty": "Medium",
  "tags": [
    "Array",
    "Two Pointers"
  ],
  "descriptionMarkdown": "Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.\n\nWe use integers 0, 1, and 2 to represent red, white, and blue, respectively. You must solve this without using the library's sort function.\n\nExample 1:\nInput: nums = [2,0,2,1,1,0]\nOutput: [0,0,1,1,2,2]\n\nExample 2:\nInput: nums = [2,0,1]\nOutput: [0,1,2]\n\nConstraints:\n- n == nums.length\n- 1 <= n <= 300\n- nums[i] is either 0, 1, or 2\n\nFollow-up: Can you come up with a one-pass algorithm using only constant extra space?",
  "solutionExplanation": "A straightforward approach is counting sort: count occurrences of 0s, 1s, and 2s, then overwrite the array. This is O(n) time and O(1) space but requires two passes. The follow-up asks for a one-pass, constant-space algorithm.\n\nUse Dijkstra's Dutch National Flag algorithm with three pointers: low, mid, and high. Maintain invariants: [0..low-1] are 0s, [low..mid-1] are 1s, [mid..high] are unknown, and [high+1..end] are 2s. Iterate while mid <= high:\n- If nums[mid] == 0, swap with nums[low], then low++, mid++.\n- If nums[mid] == 1, mid++.\n- If nums[mid] == 2, swap with nums[high], then high-- (do not increment mid because the new value at mid is unprocessed).\nThis performs in one pass, in-place, with constant extra space.",
  "solutionCode": "from typing import List\n\nclass Solution:\n    def sortColors(self, nums: List[int]) -> None:\n        \"\"\"\n        Do not return anything, modify nums in-place instead.\n        Dutch National Flag algorithm.\n        \"\"\"\n        low, mid, high = 0, 0, len(nums) - 1\n        while mid <= high:\n            if nums[mid] == 0:\n                nums[low], nums[mid] = nums[mid], nums[low]\n                low += 1\n                mid += 1\n            elif nums[mid] == 1:\n                mid += 1\n            else:  # nums[mid] == 2\n                nums[high], nums[mid] = nums[mid], nums[high]\n                high -= 1",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)"
};
