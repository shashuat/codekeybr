import { Problem } from '../../types';

export const DM_3_RESHAPE_MATRIX: Problem = {
  "id": "dm_3_reshape_matrix",
  "title": "Reshape Matrix",
  "difficulty": "Easy",
  "tags": [
    "Linear Algebra",
    "Matrix Operations"
  ],
  "descriptionMarkdown": "Write a Python function that reshapes a given matrix into a specified shape. If it cannot be reshaped, return an empty list `[]`.\n\nExample:\n\nInput:\n- `a = [[1, 2, 3, 4], [5, 6, 7, 8]]`\n- `new_shape = (4, 2)`\n\nOutput:\n- `[[1, 2], [3, 4], [5, 6], [7, 8]]`\n\nReasoning:\nThe given matrix is reshaped from 2x4 to 4x2.",
  "solutionExplanation": "To reshape a matrix safely, we must ensure the total number of elements remains the same. For an input matrix with MxN elements, the product of the target shape dimensions must equal MxN; otherwise, reshaping is impossible and we should return an empty list.\n\nUsing PyTorch, we first validate that the input is a proper rectangular matrix and that the target shape has positive dimensions. We then construct a tensor from the input list of lists, use `torch.reshape` to change its shape, and finally convert the result back to a Python list with `.tolist()` to satisfy the output requirement. If any validation fails, we return `[]`.",
  "solutionCode": "import torch\nfrom typing import List, Tuple, Union\n\nNumber = Union[int, float]\n\ndef reshape_matrix(a: List[List[Number]], new_shape: Tuple[int, int]) -> List[List[Number]]:\n    \"\"\"\n    Reshape a matrix represented as a list of lists into the specified shape using PyTorch.\n    If reshaping is not possible, return an empty list [].\n\n    Args:\n        a: List of lists representing the input matrix (rectangular).\n        new_shape: Tuple (rows, cols) representing the desired shape. Must be positive integers.\n\n    Returns:\n        A list of lists representing the reshaped matrix, or [] if it cannot be reshaped.\n    \"\"\"\n    # Validate new_shape\n    if (not isinstance(new_shape, tuple)) or len(new_shape) != 2:\n        return []\n    rows, cols = new_shape\n    if not (isinstance(rows, int) and isinstance(cols, int)):\n        return []\n    if rows <= 0 or cols <= 0:\n        return []\n\n    # Validate input matrix 'a' is a proper rectangular list of lists\n    if not isinstance(a, list) or len(a) == 0 or not all(isinstance(row, list) for row in a):\n        return []\n    row_lengths = [len(row) for row in a]\n    if len(row_lengths) == 0 or any(length == 0 for length in row_lengths):\n        return []\n    if len(set(row_lengths)) != 1:\n        # Non-rectangular matrix cannot be formed into a tensor properly\n        return []\n\n    total_elems = sum(row_lengths)\n    if total_elems != rows * cols:\n        return []\n\n    # Create tensor, reshape, and convert back to list of lists\n    t = torch.tensor(a)\n    reshaped = torch.reshape(t, (rows, cols))\n    return reshaped.tolist()\n\nif __name__ == \"__main__\":\n    # Example usage\n    a = [[1, 2, 3, 4], [5, 6, 7, 8]]\n    new_shape = (4, 2)\n    out = reshape_matrix(a, new_shape)\n    print(out)  # Expected: [[1, 2], [3, 4], [5, 6], [7, 8]]\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(N)",
  "platform": "deepml"
};
