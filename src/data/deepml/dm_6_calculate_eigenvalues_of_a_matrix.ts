import { Problem } from '../../types';

export const DM_6_CALCULATE_EIGENVALUES_OF_A_MATRIX: Problem = {
  "id": "dm_6_calculate_eigenvalues_of_a_matrix",
  "title": "Calculate Eigenvalues of a Matrix",
  "difficulty": "Medium",
  "tags": [
    "Linear Algebra",
    "Matrix Operations"
  ],
  "descriptionMarkdown": "Write a Python function that calculates the eigenvalues of a 2x2 matrix. The function should return a list containing the eigenvalues, sorted from highest to lowest.\n\nExample:\n- Input: `matrix = [[2, 1], [1, 2]]`\n- Output: `[3.0, 1.0]`\n\nFor a 2x2 matrix A, the eigenvalues are solutions to the characteristic polynomial: \u03bb^2 \u2212 trace(A)\u00b7\u03bb + det(A) = 0.",
  "solutionExplanation": "For a 2x2 matrix A = [[a, b], [c, d]], the characteristic polynomial is \u03bb^2 \u2212 (a + d)\u03bb + (ad \u2212 bc) = 0. The eigenvalues are obtained from the quadratic formula: \u03bb = (trace(A) \u00b1 sqrt(trace(A)^2 \u2212 4\u00b7det(A))) / 2. This directly uses the matrix trace and determinant, which can be efficiently computed.\n\nWe implement this using PyTorch to adhere to the requirement. We compute trace and determinant with torch operations, evaluate the discriminant, and obtain the two eigenvalues. The results are then sorted in descending order. To make the function robust, we clamp very small negative discriminants (from numerical error) to zero and raise a clear error if the discriminant is truly negative (indicating complex eigenvalues) since the task expects real-valued outputs.",
  "solutionCode": "import torch\nimport torch.nn as nn\nfrom typing import List, Sequence\n\ndef calculate_eigenvalues(matrix: Sequence[Sequence[float]]) -> List[float]:\n    \"\"\"\n    Calculate the eigenvalues of a 2x2 matrix using PyTorch operations and\n    return them sorted from highest to lowest.\n\n    Args:\n        matrix: A 2x2 nested sequence (list/tuple) of numbers.\n\n    Returns:\n        A list of two floats: eigenvalues in descending order.\n\n    Raises:\n        ValueError: If the input is not 2x2 or if eigenvalues are complex.\n    \"\"\"\n    A = torch.tensor(matrix, dtype=torch.float64)\n    if A.shape != (2, 2):\n        raise ValueError(\"Input must be a 2x2 matrix.\")\n\n    # Compute trace and determinant using torch ops\n    tr = torch.trace(A)\n    det = torch.det(A)\n\n    # Discriminant of the quadratic: tr^2 - 4*det\n    disc = tr * tr - 4.0 * det\n\n    # Numerical stability: allow tiny negative values due to floating-point error\n    eps = 1e-12\n    if disc < -eps:\n        raise ValueError(\"Matrix has complex eigenvalues; expected real eigenvalues for this task.\")\n    disc = torch.clamp(disc, min=0.0)\n\n    sqrt_disc = torch.sqrt(disc)\n    lam1 = (tr + sqrt_disc) / 2.0\n    lam2 = (tr - sqrt_disc) / 2.0\n\n    eigs = torch.stack([lam1, lam2])\n    eigs_sorted, _ = torch.sort(eigs, descending=True)\n    return [float(eigs_sorted[0].item()), float(eigs_sorted[1].item())]\n\n\ndef solution():\n    # Example usage\n    matrix = [[2, 1], [1, 2]]\n    eigenvalues = calculate_eigenvalues(matrix)\n    print(eigenvalues)  # Expected: [3.0, 1.0]\n",
  "timeComplexity": "O(1)",
  "spaceComplexity": "O(1)",
  "platform": "deepml"
};
