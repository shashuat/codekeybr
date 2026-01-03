import { Problem } from '../../types';

export const SEARCH_IN_ROTATED_SORTED_ARRAY: Problem = {
  "id": "33_search_in_rotated_sorted_array",
  "title": "Search in Rotated Sorted Array",
  "difficulty": "Medium",
  "tags": [
    "Array",
    "Binary Search"
  ],
  "descriptionMarkdown": "There is an integer array `nums` sorted in ascending order with distinct values.\n\nPrior to being passed in, `nums` is possibly left rotated at an unknown index `k` (`1 <= k < nums.length`) so the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (0-indexed). For example, `[0,1,2,4,5,6,7]` left rotated by `3` becomes `[4,5,6,7,0,1,2]`.\n\nGiven the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not.\n\nYou must write an algorithm with `O(log n)` runtime complexity.\n\nExamples:\n- Input: `nums = [4,5,6,7,0,1,2]`, `target = 0` \u2192 Output: `4`\n- Input: `nums = [4,5,6,7,0,1,2]`, `target = 3` \u2192 Output: `-1`\n- Input: `nums = [1]`, `target = 0` \u2192 Output: `-1`\n\nConstraints:\n- `1 <= nums.length <= 5000`\n- `-10^4 <= nums[i] <= 10^4`\n- All values of `nums` are unique\n- `nums` is an ascending array that is possibly rotated\n- `-10^4 <= target <= 10^4`",
  "solutionExplanation": "We can still use binary search by leveraging the fact that at least one half of the array around any midpoint is sorted. For indices `l`, `r`, and `m = (l + r) // 2`, either the left half `[l..m]` is sorted (when `nums[l] <= nums[m]`) or the right half `[m..r]` is sorted (otherwise). This invariant holds regardless of how the array was rotated (left or right).\n\nOnce we identify the sorted half, we check if `target` lies within that half's bounds. If it does, we narrow the search to that half; otherwise, we search the other half. Repeating this yields `O(log n)` time and `O(1)` space, and naturally handles edge cases like arrays of size 1 or when the pivot lies near the ends.",
  "solutionCode": "from typing import List\n\nclass Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        l, r = 0, len(nums) - 1\n        while l <= r:\n            m = (l + r) // 2\n            if nums[m] == target:\n                return m\n            # Determine which half is sorted\n            if nums[l] <= nums[m]:  # left half is sorted\n                if nums[l] <= target < nums[m]:\n                    r = m - 1\n                else:\n                    l = m + 1\n            else:  # right half is sorted\n                if nums[m] < target <= nums[r]:\n                    l = m + 1\n                else:\n                    r = m - 1\n        return -1",
  "timeComplexity": "O(log n)",
  "spaceComplexity": "O(1)"
};
