import { Problem } from '../../types';

export const MEDIAN_OF_TWO_SORTED_ARRAYS: Problem = {
  "id": "4_median_of_two_sorted_arrays",
  "title": "Median of Two Sorted Arrays",
  "difficulty": "Hard",
  "tags": [
    "Array",
    "Binary Search",
    "Divide and Conquer"
  ],
  "descriptionMarkdown": "Given two sorted arrays nums1 and nums2 of sizes m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log(m+n)).\n\nExamples:\n\nExample 1:\nInput: nums1 = [1,3], nums2 = [2]\nOutput: 2.00000\nExplanation: merged array = [1,2,3] and median is 2.\n\nExample 2:\nInput: nums1 = [1,2], nums2 = [3,4]\nOutput: 2.50000\nExplanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.\n\nConstraints:\n- nums1.length == m\n- nums2.length == n\n- 0 <= m <= 1000\n- 0 <= n <= 1000\n- 1 <= m + n <= 2000\n- -10^6 <= nums1[i], nums2[i] <= 10^6",
  "solutionExplanation": "Use binary search on the smaller array to find a partition of both arrays such that all elements on the left side are less than or equal to all elements on the right side. Let i be the cut in nums1 and j be the cut in nums2 so that i + j equals half of the total length (rounded up). We check the boundary values around the cuts: l1=nums1[i-1], r1=nums1[i], l2=nums2[j-1], r2=nums2[j], using -inf/+inf when a side is empty.\n\nIf l1 <= r2 and l2 <= r1, the partition is correct. The median is then max(l1, l2) when the total length is odd, or the average of max(l1, l2) and min(r1, r2) when even. If l1 > r2, move the cut left (decrease i); otherwise move it right (increase i). Always binary search the smaller array to ensure logarithmic complexity.\n\nThis approach avoids merging and keeps constant extra space while guaranteeing O(log(min(m, n))) time.",
  "solutionCode": "from typing import List\n\nclass Solution:\n    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:\n        # Ensure nums1 is the smaller array to minimize the binary search range\n        if len(nums1) > len(nums2):\n            nums1, nums2 = nums2, nums1\n        m, n = len(nums1), len(nums2)\n\n        left, right = 0, m\n        half = (m + n + 1) // 2\n\n        INF_POS = float('inf')\n        INF_NEG = float('-inf')\n\n        while left <= right:\n            i = (left + right) // 2  # cut in nums1\n            j = half - i             # cut in nums2\n\n            l1 = INF_NEG if i == 0 else nums1[i - 1]\n            r1 = INF_POS if i == m else nums1[i]\n            l2 = INF_NEG if j == 0 else nums2[j - 1]\n            r2 = INF_POS if j == n else nums2[j]\n\n            if l1 <= r2 and l2 <= r1:\n                if (m + n) % 2 == 1:\n                    return float(max(l1, l2))\n                return (max(l1, l2) + min(r1, r2)) / 2.0\n            elif l1 > r2:\n                right = i - 1\n            else:\n                left = i + 1\n\n        # Control should never reach here if inputs meet constraints\n        raise ValueError(\"Invalid input: arrays are not sorted or constraints violated.\")",
  "timeComplexity": "O(log(min(m, n)))",
  "spaceComplexity": "O(1)",
  "platform": "leetcode"
};
