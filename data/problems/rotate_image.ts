import { Problem } from '../../types';

export const ROTATE_IMAGE: Problem = {
  "id": "48_rotate_image",
  "title": "Rotate Image",
  "difficulty": "Medium",
  "tags": [
    "Array",
    "Matrix"
  ],
  "descriptionMarkdown": "You are given an n x n 2D matrix representing an image. Rotate the image by 90 degrees clockwise.\n\nRotate the matrix in-place: modify the input matrix directly without allocating another 2D matrix.\n\nExample 1:\n```\nInput:  matrix = [[1,2,3],[4,5,6],[7,8,9]]\nOutput: [[7,4,1],[8,5,2],[9,6,3]]\n```\n\nExample 2:\n```\nInput:  matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]\nOutput: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]\n```\n\nConstraints:\n- n == matrix.length == matrix[i].length\n- 1 <= n <= 20\n- -1000 <= matrix[i][j] <= 1000",
  "solutionExplanation": "Key observation: A 90-degree clockwise rotation is equivalent to transposing the matrix (swap across the main diagonal) and then reversing each row. Transpose converts rows to columns; reversing each row reorders columns to achieve the clockwise effect. Both steps can be done in-place by swapping elements.\n\nAlternatively, you can rotate layer by layer and perform four-way swaps for each group of four cells. While also O(N^2), the transpose-then-reverse method is simpler and less error-prone.\n\nBoth approaches touch each element a constant number of times, and they require only O(1) extra space.",
  "solutionCode": "from typing import List\n\nclass Solution:\n    def rotate(self, matrix: List[List[int]]) -> None:\n        \"\"\"\n        Do not return anything, modify matrix in-place instead.\n        \"\"\"\n        n = len(matrix)\n        # Transpose in-place\n        for i in range(n):\n            for j in range(i + 1, n):\n                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]\n        # Reverse each row in-place\n        for i in range(n):\n            l, r = 0, n - 1\n            while l < r:\n                matrix[i][l], matrix[i][r] = matrix[i][r], matrix[i][l]\n                l += 1\n                r -= 1\n",
  "timeComplexity": "O(N^2)",
  "spaceComplexity": "O(1)"
};
