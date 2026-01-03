import { Problem } from '../../types';

export const DM_8_CALCULATE_2X2_MATRIX_INVERSE: Problem = {
  "id": "dm_8_calculate_2x2_matrix_inverse",
  "title": "Calculate 2x2 Matrix Inverse",
  "difficulty": "Easy",
  "tags": [
    "Linear Algebra",
    "Matrix Operations"
  ],
  "descriptionMarkdown": "Write a Python function that calculates the inverse of a 2x2 matrix using PyTorch. The inverse of a matrix A is another matrix A^{-1} such that A \u00d7 A^{-1} = I (the identity matrix). For a 2x2 matrix [[a, b], [c, d]], the inverse exists only if the determinant (ad - bc) is non-zero. Return None if the matrix is not invertible (i.e., when the determinant equals zero).\n\nExample:\n\nInput:\n\nmatrix = [[4, 7], [2, 6]]\n\nOutput:\n\n[[0.6, -0.7], [-0.2, 0.4]]\n\nReasoning:\nFor matrix [[a, b], [c, d]] = [[4, 7], [2, 6]]:\n- Calculate determinant: det = ad - bc = 4\u00d76 - 7\u00d72 = 24 - 14 = 10\n- Since det \u2260 0, the matrix is invertible\n- Apply formula: A^{-1} = (1/det) \u00d7 [[d, -b], [-c, a]] = (1/10) \u00d7 [[6, -7], [-2, 4]] = [[0.6, -0.7], [-0.2, 0.4]]",
  "solutionExplanation": "For a 2x2 matrix [[a, b], [c, d]], the inverse exists if and only if the determinant det = ad \u2212 bc is non-zero. When invertible, the inverse is given by the closed-form expression A^{-1} = (1/det) * [[d, -b], [-c, a]]. This direct formula is constant time and avoids the overhead of generic matrix inversion routines.\n\nThe implementation converts the input list into a PyTorch tensor for numerical operations, computes the determinant with tensor arithmetic, and returns None when the determinant is exactly zero. Otherwise, it builds the adjugate matrix [[d, -b], [-c, a]], divides by the determinant, and converts the result back to a Python list. Using float64 ensures good numeric precision for typical inputs.",
  "solutionCode": "import torch\n\n\ndef inverse_2x2(matrix: list[list[float]]):\n    \"\"\"\n    Calculate the inverse of a 2x2 matrix using PyTorch.\n\n    Args:\n        matrix: A 2x2 matrix represented as [[a, b], [c, d]].\n\n    Returns:\n        The inverse matrix as a 2x2 list of floats, or None if the matrix is singular.\n    \"\"\"\n    # Validate input shape\n    if (\n        not isinstance(matrix, (list, tuple)) or len(matrix) != 2 or\n        any(not isinstance(row, (list, tuple)) or len(row) != 2 for row in matrix)\n    ):\n        raise ValueError(\"Input must be a 2x2 matrix [[a, b], [c, d]]\")\n\n    # Create a tensor with double precision for better numerical stability\n    M = torch.tensor(matrix, dtype=torch.float64)\n    a, b = M[0, 0], M[0, 1]\n    c, d = M[1, 0], M[1, 1]\n\n    # Compute determinant\n    det = a * d - b * c\n\n    # If determinant is exactly zero, matrix is not invertible\n    if det.item() == 0.0:\n        return None\n\n    # Construct adjugate [[d, -b], [-c, a]] and divide by determinant\n    adj = torch.stack([\n        torch.stack([d, -b]),\n        torch.stack([-c, a])\n    ])\n    inv = adj / det\n\n    return inv.tolist()\n\n\ndef solution():\n    # Example usage\n    matrix = [[4, 7], [2, 6]]\n    inv = inverse_2x2(matrix)\n    print(inv)  # Expected: [[0.6, -0.7], [-0.2, 0.4]]\n    return inv\n",
  "timeComplexity": "O(1)",
  "spaceComplexity": "O(1)",
  "platform": "deepml"
};
