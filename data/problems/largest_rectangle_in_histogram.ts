import { Problem } from '../../types';

export const LARGEST_RECTANGLE_IN_HISTOGRAM: Problem = {
  "id": "84_largest_rectangle_in_histogram",
  "title": "Largest Rectangle in Histogram",
  "difficulty": "Hard",
  "tags": [
    "Array",
    "Stack"
  ],
  "descriptionMarkdown": "Given an array of integers heights representing the histogram's bar heights where the width of each bar is 1, return the area of the largest rectangle in the histogram.\n\nExample 1:\nInput: heights = [2,1,5,6,2,3]\nOutput: 10\nExplanation: The largest rectangle (highlighted in red in the original diagram) has area 10.\n\nExample 2:\nInput: heights = [2,4]\nOutput: 4\n\nConstraints:\n- 1 <= heights.length <= 1e5\n- 0 <= heights[i] <= 1e4",
  "solutionExplanation": "Use a monotonic increasing stack that stores indices of bars. As you iterate, maintain the stack so that heights are non-decreasing. When you encounter a bar shorter than the bar at the top of the stack, you pop indices and compute areas for rectangles that end just before the current index. For each popped bar as the minimum height, the width spans from the new top of the stack plus one up to the current index minus one.\n\nTo flush all remaining bars, append a sentinel bar of height 0 (or perform a final cleanup pass). Using a sentinel index of -1 on the stack simplifies width computation: when popping index j, height = heights[j], width = i - stack[-1] - 1, where i is the current index. Track the maximum area across all pops.\n\nThis approach examines each bar at most twice (push and pop), yielding linear time and efficient memory usage.",
  "solutionCode": "from typing import List\n\nclass Solution:\n    def largestRectangleArea(self, heights: List[int]) -> int:\n        # Monotonic increasing stack of indices; start with sentinel index -1\n        stack = [-1]\n        max_area = 0\n        \n        for i, h in enumerate(heights + [0]):  # sentinel 0 to flush the stack\n            # Maintain increasing heights in the stack\n            while stack[-1] != -1 and h < heights[stack[-1]]:\n                height = heights[stack.pop()]\n                width = i - stack[-1] - 1\n                max_area = max(max_area, height * width)\n            stack.append(i)\n        \n        return max_area",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(N)"
};
