import { Problem } from '../../types';

export const COMBINATION_SUM: Problem = {
  "id": "39_combination_sum",
  "title": "Combination Sum",
  "difficulty": "Medium",
  "tags": [
    "Array",
    "Backtracking",
    "DFS"
  ],
  "descriptionMarkdown": "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.\n\nThe same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.\n\nThe test cases are generated such that the number of unique combinations that sum up to target is less than 150 for the given input.\n\nExample 1:\n\nInput: candidates = [2,3,6,7], target = 7\nOutput: [[2,2,3],[7]]\nExplanation:\n- 2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.\n- 7 is a candidate, and 7 = 7.\nThese are the only two combinations.\n\nExample 2:\n\nInput: candidates = [2,3,5], target = 8\nOutput: [[2,2,2,2],[2,3,3],[3,5]]\n\nExample 3:\n\nInput: candidates = [2], target = 1\nOutput: []\n\nConstraints:\n- 1 <= candidates.length <= 30\n- 2 <= candidates[i] <= 40\n- All elements of candidates are distinct.\n- 1 <= target <= 40",
  "solutionExplanation": "Use backtracking (DFS) to explore combinations. Sort candidates to enable early pruning: once a candidate exceeds the remaining target, further candidates (which are larger) can be skipped. Maintain a running path and the remaining sum; when the remaining sum reaches zero, record the path as a valid combination.\n\nTo ensure uniqueness and allow unlimited reuse, iterate candidates starting from a given index start. Passing i (not i+1) into the recursive call allows reusing the same candidate multiple times. This ordering prevents permutations of the same multiset from being generated, yielding each combination exactly once while pruning branches that exceed the target.",
  "solutionCode": "from typing import List\n\nclass Solution:\n    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:\n        candidates.sort()\n        res: List[List[int]] = []\n        path: List[int] = []\n\n        def dfs(start: int, remaining: int) -> None:\n            if remaining == 0:\n                res.append(path.copy())\n                return\n            for i in range(start, len(candidates)):\n                val = candidates[i]\n                if val > remaining:\n                    break  # further values will be larger due to sorting\n                path.append(val)\n                dfs(i, remaining - val)  # reuse allowed\n                path.pop()\n\n        dfs(0, target)\n        return res",
  "timeComplexity": "Exponential in target; O(#combinations \u00d7 average_length) due to backtracking and output size",
  "spaceComplexity": "O(target / min(candidates)) recursion stack (excluding output)"
};
