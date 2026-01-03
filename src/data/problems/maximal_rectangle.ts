import { Problem } from '../../types';

export const MAXIMAL_RECTANGLE: Problem = {
  "id": "85_maximal_rectangle",
  "title": "Maximal Rectangle",
  "difficulty": "Hard",
  "tags": [
    "Array",
    "Stack",
    "Dynamic Programming",
    "Matrix",
    "Monotonic Stack"
  ],
  "descriptionMarkdown": "Given a rows x cols binary matrix filled with 0s and 1s, find the largest rectangle containing only 1s and return its area.\n\nExamples\n\nExample 1:\nInput: matrix = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]\nOutput: 6\nExplanation: The maximal rectangle has area 6.\n\nExample 2:\nInput: matrix = [[\"0\"]]\nOutput: 0\n\nExample 3:\nInput: matrix = [[\"1\"]]\nOutput: 1\n\nConstraints\n- rows == matrix.length\n- cols == matrix[i].length\n- 1 <= rows, cols <= 200\n- matrix[i][j] is '0' or '1'",
  "solutionExplanation": "Treat each row as the base of a histogram: for every column j, maintain heights[j] = number of consecutive 1s ending at the current row. This transforms the 2D problem into a sequence of Largest Rectangle in Histogram problems, one per row.\n\nFor each row, after updating heights, compute the largest rectangle area in the histogram using a monotonic increasing stack of indices. When the current bar is lower than the top of the stack, we pop and compute the area with the popped height as the limiting height, with width determined by the current index and the new stack top. Appending a sentinel height 0 at the end ensures all bars are processed.\n\nThis approach is optimal: updating heights is O(cols) per row, and the stack-based histogram scan is also O(cols) per row (each index is pushed and popped at most once).",
  "solutionCode": "from typing import List\n\nclass Solution:\n    def maximalRectangle(self, matrix: List[List[str]]) -> int:\n        if not matrix or not matrix[0]:\n            return 0\n        rows, cols = len(matrix), len(matrix[0])\n        heights = [0] * cols\n        max_area = 0\n\n        for r in range(rows):\n            # Build histogram heights for this row\n            for c in range(cols):\n                if matrix[r][c] == '1':\n                    heights[c] += 1\n                else:\n                    heights[c] = 0\n\n            # Largest Rectangle in Histogram using monotonic stack\n            stack = []  # stores indices of increasing heights\n            for i in range(cols + 1):\n                curr_h = heights[i] if i < cols else 0  # sentinel at the end\n                while stack and curr_h < heights[stack[-1]]:\n                    h = heights[stack.pop()]\n                    left = stack[-1] if stack else -1\n                    width = i - left - 1\n                    max_area = max(max_area, h * width)\n                stack.append(i)\n\n        return max_area",
  "timeComplexity": "O(rows * cols)",
  "spaceComplexity": "O(cols)"
};
