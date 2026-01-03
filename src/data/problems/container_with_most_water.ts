import { Problem } from '../../types';

export const CONTAINER_WITH_MOST_WATER: Problem = {
  "id": "11_container_with_most_water",
  "title": "Container With Most Water",
  "difficulty": "Medium",
  "tags": [
    "Array",
    "Two Pointers",
    "Greedy"
  ],
  "descriptionMarkdown": "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the i-th line are (i, 0) and (i, height[i]).\n\nFind two lines that together with the x-axis form a container such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.\n\nNotice that you may not slant the container.\n\nExample 1:\nInput: height = [1,8,6,2,5,4,8,3,7]\nOutput: 49\nExplanation: The vertical lines are represented by the array. The maximum area of water the container can contain is 49.\n\nExample 2:\nInput: height = [1,1]\nOutput: 1\n\nConstraints:\n- n == height.length\n- 2 <= n <= 1e5\n- 0 <= height[i] <= 1e4",
  "solutionExplanation": "Use a two-pointer approach: start with one pointer at the left end and one at the right end. The area formed by these two lines is min(height[left], height[right]) * (right - left). To potentially increase the area, move the pointer at the shorter line inward, because the width always decreases as pointers move inward, and only a taller line can compensate for the reduced width. If the taller side is moved, the next area cannot be larger than the current one since height is limited by the shorter side.\n\nThis greedy step is safe: at each iteration, discarding the shorter side cannot eliminate an optimal solution, because any container using that shorter side is limited by its height; moving past it gives a chance to find a taller boundary while width shrinks by at most 1. Continue until the pointers meet, tracking the maximum area seen.",
  "solutionCode": "from typing import List\n\nclass Solution:\n    def maxArea(self, height: List[int]) -> int:\n        left, right = 0, len(height) - 1\n        best = 0\n        while left < right:\n            h_left, h_right = height[left], height[right]\n            width = right - left\n            best = max(best, min(h_left, h_right) * width)\n            if h_left < h_right:\n                left += 1\n            else:\n                right -= 1\n        return best",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)"
};
