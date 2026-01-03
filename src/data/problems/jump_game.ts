import { Problem } from '../../types';

export const JUMP_GAME: Problem = {
  "id": "55_jump_game",
  "title": "Jump Game",
  "difficulty": "Medium",
  "tags": [
    "Array",
    "Greedy"
  ],
  "descriptionMarkdown": "You are given an integer array `nums`. You start at the array's first index, and each element represents your maximum jump length from that position.\n\nReturn `true` if you can reach the last index, or `false` otherwise.\n\nExamples\n\nExample 1:\n```\nInput: nums = [2,3,1,1,4]\nOutput: true\nExplanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.\n```\n\nExample 2:\n```\nInput: nums = [3,2,1,0,4]\nOutput: false\nExplanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.\n```\n\nConstraints\n- 1 <= nums.length <= 10^4\n- 0 <= nums[i] <= 10^5",
  "solutionExplanation": "Use a greedy scan that tracks the farthest index you can reach so far. Initialize `maxReach = 0` and iterate left to right. If at any index `i` you find that `i > maxReach`, then you cannot even step onto `i`, so reaching the end is impossible. Otherwise, update `maxReach = max(maxReach, i + nums[i])`.\n\nThis works because at each position you only need to know the farthest next position you can reach; any path that gets you to an index `i` is dominated by the one that maximizes the farthest future reach. If you finish scanning without getting stuck, every index up to the last was reachable, implying the last index is reachable as well.",
  "solutionCode": "from typing import List\n\nclass Solution:\n    def canJump(self, nums: List[int]) -> bool:\n        max_reach = 0\n        for i, jump in enumerate(nums):\n            if i > max_reach:\n                return False\n            max_reach = max(max_reach, i + jump)\n        return True",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)"
};
