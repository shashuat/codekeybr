import { Problem } from '../../types';

export const MERGE_INTERVALS: Problem = {
  "id": "56_merge_intervals",
  "title": "Merge Intervals",
  "difficulty": "Medium",
  "tags": [
    "Array",
    "Sorting",
    "Greedy"
  ],
  "descriptionMarkdown": "Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the intervals in the input.\n\nExamples:\n\nExample 1:\nInput: intervals = [[1,3],[2,6],[8,10],[15,18]]\nOutput: [[1,6],[8,10],[15,18]]\nExplanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].\n\nExample 2:\nInput: intervals = [[1,4],[4,5]]\nOutput: [[1,5]]\nExplanation: Intervals [1,4] and [4,5] are considered overlapping.\n\nExample 3:\nInput: intervals = [[4,7],[1,4]]\nOutput: [[1,7]]\nExplanation: Intervals [1,4] and [4,7] are considered overlapping.\n\nConstraints:\n- 1 <= intervals.length <= 1e4\n- intervals[i].length == 2\n- 0 <= start_i <= end_i <= 1e4",
  "solutionExplanation": "Sort the intervals by their start value. Then scan from left to right while maintaining a current interval [cur_start, cur_end]. For each next interval [start, end], if start <= cur_end, the intervals overlap (touching endpoints also counts), so update cur_end = max(cur_end, end). Otherwise, push the current interval to the result and reset the current interval to [start, end].\n\nThis greedy approach works because sorting by start ensures that whenever an interval overlaps with the current one, merging them yields the earliest possible start and the farthest necessary end to cover all overlaps so far. After processing all intervals, append the last current interval to the result.",
  "solutionCode": "from typing import List\n\nclass Solution:\n    def merge(self, intervals: List[List[int]]) -> List[List[int]]:\n        if not intervals:\n            return []\n        # Sort by start time\n        intervals.sort(key=lambda x: x[0])\n\n        merged: List[List[int]] = []\n        cur_start, cur_end = intervals[0]\n\n        for start, end in intervals[1:]:\n            if start <= cur_end:\n                # Overlapping or touching; extend the current interval\n                cur_end = max(cur_end, end)\n            else:\n                # No overlap; push the finished interval and start a new one\n                merged.append([cur_start, cur_end])\n                cur_start, cur_end = start, end\n\n        # Append the last interval\n        merged.append([cur_start, cur_end])\n        return merged\n",
  "timeComplexity": "O(N log N)",
  "spaceComplexity": "O(N)"
};
