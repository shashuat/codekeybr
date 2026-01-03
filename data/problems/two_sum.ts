import { Problem } from '../../types';

export const TWO_SUM: Problem = {
  "id": "1_two_sum",
  "title": "Two Sum",
  "difficulty": "Easy",
  "tags": [
    "Array",
    "Hash Table"
  ],
  "descriptionMarkdown": "Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input has exactly one solution, and you may not use the same element twice. You can return the answer in any order.\n\nExamples:\n\n```\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].\n```\n\n```\nInput: nums = [3,2,4], target = 6\nOutput: [1,2]\n```\n\n```\nInput: nums = [3,3], target = 6\nOutput: [0,1]\n```\n\nConstraints:\n- 2 <= nums.length <= 10^4\n- -10^9 <= nums[i] <= 10^9\n- -10^9 <= target <= 10^9\n- Only one valid answer exists.\n\nFollow-up: Can you come up with an algorithm that is less than O(n^2) time complexity?",
  "solutionExplanation": "Use a single-pass hash map to record previously seen numbers and their indices. For each number x at index i, compute its complement c = target - x. If c is already in the map, we have found the pair and can return the stored index of c along with i. Otherwise, store x -> i in the map and continue.\n\nThis approach ensures each element is processed once, and each lookup/insert is on average O(1). The method avoids using the same element twice because we only match the current element with a previously seen complement, and we return immediately when a valid pair is found.",
  "solutionCode": "from typing import List\n\nclass Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        index_by_value = {}\n        for i, x in enumerate(nums):\n            complement = target - x\n            if complement in index_by_value:\n                return [index_by_value[complement], i]\n            index_by_value[x] = i\n        # Given the constraints, a solution always exists.\n        raise ValueError(\"No two sum solution\")\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(N)"
};
