import { Problem } from '../../types';

export const SUBSETS: Problem = {
  "id": "78_subsets",
  "title": "Subsets",
  "difficulty": "Medium",
  "tags": [
    "Array",
    "Backtracking",
    "Bit Manipulation",
    "DFS"
  ],
  "descriptionMarkdown": "Given an integer array `nums` of unique elements, return all possible subsets (the power set).\n\nThe solution set must not contain duplicate subsets. Return the solution in any order.\n\nExamples\n\n- Example 1:\n```\nInput: nums = [1,2,3]\nOutput: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]\n```\n\n- Example 2:\n```\nInput: nums = [0]\nOutput: [[],[0]]\n```\n\nConstraints\n- `1 <= nums.length <= 10`\n- `-10 <= nums[i] <= 10`\n- All the numbers of `nums` are unique.",
  "solutionExplanation": "A standard way to generate all subsets is depth-first search (DFS) backtracking. We build subsets incrementally: at each index, we choose to either include the current element or skip it, exploring both branches. When we reach the end, we record the current path as a subset. This guarantees we enumerate exactly 2^N subsets, with no duplicates, because each element has a binary choice (include/exclude) and the input elements are unique.\n\nAnother common approach is bitmask enumeration: for each integer mask from 0 to (1<<N)-1, use the mask's bits to decide which elements to include. Both methods run in O(N * 2^N) time. Backtracking is often preferred for readability and flexibility (e.g., when extending to constraints like subset size).",
  "solutionCode": "from typing import List\n\nclass Solution:\n    def subsets(self, nums: List[int]) -> List[List[int]]:\n        '''\n        Generate all subsets (power set) via backtracking.\n        Time: O(N * 2^N), Space: O(N) auxiliary (recursion path), output is O(2^N).\n        '''\n        res: List[List[int]] = []\n        path: List[int] = []\n        n = len(nums)\n\n        def dfs(i: int) -> None:\n            if i == n:\n                res.append(path.copy())\n                return\n            # Exclude nums[i]\n            dfs(i + 1)\n            # Include nums[i]\n            path.append(nums[i])\n            dfs(i + 1)\n            path.pop()\n\n        dfs(0)\n        return res",
  "timeComplexity": "O(N * 2^N)",
  "spaceComplexity": "O(N) auxiliary (O(2^N) including output)"
};
