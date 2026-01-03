import { Problem } from '../../types';

export const MAXIMUM_SUBARRAY: Problem = {
  "id": "53_maximum_subarray",
  "title": "Maximum Subarray",
  "difficulty": "Medium",
  "tags": [
    "Array",
    "Dynamic Programming",
    "Divide and Conquer"
  ],
  "descriptionMarkdown": "Given an integer array `nums`, find the non-empty subarray with the largest sum, and return its sum.\n\nExample 1:\n```\nInput: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6\nExplanation: The subarray [4,-1,2,1] has the largest sum 6.\n```\n\nExample 2:\n```\nInput: nums = [1]\nOutput: 1\nExplanation: The subarray [1] has the largest sum 1.\n```\n\nExample 3:\n```\nInput: nums = [5,4,-1,7,8]\nOutput: 23\nExplanation: The subarray [5,4,-1,7,8] has the largest sum 23.\n```\n\nConstraints:\n- 1 <= nums.length <= 1e5\n- -1e4 <= nums[i] <= 1e4\n\nFollow-up: If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.",
  "solutionExplanation": "The optimal linear-time solution is Kadane's algorithm. Traverse the array while maintaining a running sum `cur` of the best subarray ending at the current position. If `cur` becomes negative, starting a new subarray at the current element is better than extending the previous one, so set `cur = max(x, cur + x)`. Track the global maximum `best` across all positions. This works because any negative prefix only decreases the sum of a future subarray.\n\nA classic alternative uses divide and conquer. For each segment, compute four values: total sum, best prefix sum, best suffix sum, and best subarray sum. Merge two halves by combining these four values in O(1). Recursing over segments yields O(n log n) time and O(log n) space due to recursion.",
  "solutionCode": "from typing import List\n\nclass Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n        # Kadane's algorithm\n        cur = best = nums[0]\n        for x in nums[1:]:\n            cur = max(x, cur + x)\n            best = max(best, cur)\n        return best\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)"
};
