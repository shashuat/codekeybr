import { Problem } from '../../types';

export const FIND_FIRST_AND_LAST_POSITION_OF_ELEMENT_IN_SORTED_ARRAY: Problem = {
  "id": "34_find_first_and_last_position_of_element_in_sorted_array",
  "title": "Find First and Last Position of Element in Sorted Array",
  "difficulty": "Medium",
  "tags": [
    "Array",
    "Binary Search"
  ],
  "descriptionMarkdown": "Given an array of integers `nums` sorted in non-decreasing order, find the starting and ending position of a given `target` value.\n\nIf `target` is not found in the array, return `[-1, -1]`.\n\nYou must write an algorithm with `O(log n)` runtime complexity.\n\nExamples:\n\n- Input: `nums = [5,7,7,8,8,10]`, `target = 8`\n  Output: `[3,4]`\n\n- Input: `nums = [5,7,7,8,8,10]`, `target = 6`\n  Output: `[-1,-1]`\n\n- Input: `nums = []`, `target = 0`\n  Output: `[-1,-1]`\n\nConstraints:\n- `0 <= nums.length <= 1e5`\n- `-1e9 <= nums[i] <= 1e9`\n- `nums` is a non-decreasing array.\n- `-1e9 <= target <= 1e9`",
  "solutionExplanation": "Use two binary searches to locate the boundaries of the target. The first search (lower_bound) finds the first index where `nums[i] >= target`. If at this index the value is not equal to `target`, the element doesn't exist and we return `[-1, -1]`.\n\nIf found, run a second binary search (upper_bound) to find the first index where `nums[i] > target`. The last occurrence is then `upper_bound - 1`. Both searches operate in O(log n), and we use constant extra space.\n\nThis approach leverages the sorted property to avoid scanning the array, ensuring the required logarithmic runtime.",
  "solutionCode": "from typing import List\n\nclass Solution:\n    def searchRange(self, nums: List[int], target: int) -> List[int]:\n        def lower_bound(a: List[int], x: int) -> int:\n            lo, hi = 0, len(a)\n            while lo < hi:\n                mid = (lo + hi) // 2\n                if a[mid] < x:\n                    lo = mid + 1\n                else:\n                    hi = mid\n            return lo\n\n        def upper_bound(a: List[int], x: int) -> int:\n            lo, hi = 0, len(a)\n            while lo < hi:\n                mid = (lo + hi) // 2\n                if a[mid] <= x:\n                    lo = mid + 1\n                else:\n                    hi = mid\n            return lo\n\n        left = lower_bound(nums, target)\n        if left == len(nums) or nums[left] != target:\n            return [-1, -1]\n        right = upper_bound(nums, target) - 1\n        return [left, right]\n",
  "timeComplexity": "O(log n)",
  "spaceComplexity": "O(1)"
};
