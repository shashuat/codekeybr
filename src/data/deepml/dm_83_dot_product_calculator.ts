import { Problem } from '../../types';

export const DM_83_DOT_PRODUCT_CALCULATOR: Problem = {
  "id": "dm_83_dot_product_calculator",
  "title": "Dot Product Calculator",
  "difficulty": "Easy",
  "tags": [
    "Linear Algebra",
    "Matrix Operations"
  ],
  "descriptionMarkdown": "Write a Python function to calculate the dot product of two vectors. The function should take two 1D NumPy arrays as input and return the dot product as a single number.\n\nExample:\n- Input: `vec1 = np.array([1, 2, 3])`, `vec2 = np.array([4, 5, 6])`\n- Output: `32`\n\nReasoning: The function calculates the dot product by multiplying corresponding elements of the two vectors and summing the results. For `vec1 = [1, 2, 3]` and `vec2 = [4, 5, 6]`, the result is `(1 * 4) + (2 * 5) + (3 * 6) = 32`.",
  "solutionExplanation": "The dot product of two 1D vectors of equal length is defined as the sum of the products of their corresponding elements. Formally, for vectors a and b of length N, the dot product is sum_{i=1..N} a_i * b_i. This operation is fundamental in linear algebra and widely used in machine learning for projections, similarity measures, and gradient computations.\n\nIn PyTorch, we can compute the dot product efficiently using tensor operations. We convert the input arrays to tensors, validate that they are 1D and of equal length, and then use torch.dot (or an element-wise multiplication followed by a sum). To ensure consistent behavior even when inputs are integer arrays, we cast tensors to a floating-point dtype before computing the dot product. The final result is returned as a Python float.",
  "solutionCode": "import torch\nimport torch.nn as nn\nfrom typing import Any\n\ndef calculate_dot_product(vec1: Any, vec2: Any) -> float:\n    \"\"\"\n    Calculate the dot product of two 1D vectors using PyTorch.\n\n    Args:\n        vec1: 1D array-like (e.g., numpy.ndarray, list, or torch.Tensor) representing the first vector.\n        vec2: 1D array-like (e.g., numpy.ndarray, list, or torch.Tensor) representing the second vector.\n\n    Returns:\n        float: The scalar dot product of the two vectors.\n\n    Raises:\n        ValueError: If inputs are not 1D or have different lengths.\n    \"\"\"\n    # Convert inputs to tensors\n    t1 = torch.as_tensor(vec1)\n    t2 = torch.as_tensor(vec2)\n\n    # Validate shapes: both must be 1D and same length\n    if t1.ndim != 1 or t2.ndim != 1:\n        raise ValueError(\"Both inputs must be 1D vectors.\")\n    if t1.shape[0] != t2.shape[0]:\n        raise ValueError(\"Vectors must have the same length.\")\n\n    # Ensure floating dtype for torch.dot support and numerical stability\n    t1 = t1.to(dtype=torch.float64)\n    t2 = t2.to(dtype=torch.float64)\n\n    # Compute dot product\n    result = torch.dot(t1, t2)\n\n    # Return as a Python float\n    return float(result.item())\n\n\ndef solution() -> None:\n    \"\"\"Example usage demonstrating the dot product calculation.\"\"\"\n    import numpy as np\n\n    vec1 = np.array([1, 2, 3])\n    vec2 = np.array([4, 5, 6])\n\n    result = calculate_dot_product(vec1, vec2)\n    print(result)  # Expected output: 32.0\n\n\nif __name__ == \"__main__\":\n    solution()\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)",
  "platform": "deepml"
};
