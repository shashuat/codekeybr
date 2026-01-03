import { Problem } from '../../types';

export const DM_35_CONVERT_VECTOR_TO_DIAGONAL_MATRIX: Problem = {
  "id": "dm_35_convert_vector_to_diagonal_matrix",
  "title": "Convert Vector to Diagonal Matrix",
  "difficulty": "Easy",
  "tags": [
    "Linear Algebra",
    "Matrix Operations"
  ],
  "descriptionMarkdown": "Write a Python function to convert a 1D array into a diagonal matrix. The function should take a 1D vector `x` and return a 2D square matrix where the elements of `x` appear on the main diagonal and all off-diagonal entries are zero.\n\nExample:\n\nInput:\n\n```python\ny = [1, 2, 3]\n```\n\nOutput:\n\n```\n[[1. 0. 0.]\n [0. 2. 0.]\n [0. 0. 3.]]\n```\n\nReasoning: The input vector `[1, 2, 3]` is converted into a diagonal matrix where the elements of the vector form the diagonal of the matrix.",
  "solutionExplanation": "To convert a 1D vector into a diagonal matrix, we place each element of the vector on the main diagonal of an otherwise zero matrix. In PyTorch, this is efficiently accomplished with `torch.diag`, which takes a 1D tensor and returns a 2D square matrix with the tensor's elements on the diagonal.\n\nThis approach preserves the input tensor's dtype and device (CPU/GPU) and handles common edge cases, such as validating that the input is indeed 1D. The resulting matrix has shape (N, N) for an input of shape (N,), with zeros in all off-diagonal positions.",
  "solutionCode": "import torch\n\ndef make_diagonal(x: torch.Tensor) -> torch.Tensor:\n    \"\"\"\n    Convert a 1D tensor into a square diagonal matrix with the elements of x on the main diagonal.\n\n    Args:\n        x (torch.Tensor): 1D tensor of shape (N,)\n\n    Returns:\n        torch.Tensor: 2D tensor of shape (N, N) with x on the main diagonal.\n    \"\"\"\n    # Ensure input is a torch tensor (preserves dtype when possible)\n    if not isinstance(x, torch.Tensor):\n        x = torch.as_tensor(x)\n\n    # Validate dimensionality\n    if x.dim() != 1:\n        raise ValueError(f\"Input must be a 1D tensor, but got shape {tuple(x.shape)}\")\n\n    # torch.diag with a 1D tensor returns a 2D diagonal matrix\n    return torch.diag(x)\n\n\ndef solution():\n    \"\"\"Example usage returning the diagonal matrix for a sample input.\"\"\"\n    x = torch.tensor([1.0, 2.0, 3.0])\n    return make_diagonal(x)\n\n\nif __name__ == \"__main__\":\n    out = solution()\n    print(out)\n",
  "timeComplexity": "O(N^2)",
  "spaceComplexity": "O(N^2)",
  "platform": "deepml"
};
