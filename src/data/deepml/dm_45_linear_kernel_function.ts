import { Problem } from '../../types';

export const DM_45_LINEAR_KERNEL_FUNCTION: Problem = {
  "id": "dm_45_linear_kernel_function",
  "title": "Linear Kernel Function",
  "difficulty": "Easy",
  "tags": [
    "Linear Algebra",
    "Matrix Operations"
  ],
  "descriptionMarkdown": "Write a Python function `kernel_function` that computes the linear kernel between two input vectors `x1` and `x2`. The linear kernel is defined as the dot product (inner product) of two vectors.\n\nExample:\n\nInput:\n\n- x1 = [1, 2, 3]\n- x2 = [4, 5, 6]\n- result = kernel_function(x1, x2)\n\nOutput:\n\n- 32\n\nReasoning:\n\nThe linear kernel between x1 and x2 is computed as: 1*4 + 2*5 + 3*6 = 32.",
  "solutionExplanation": "The linear kernel is simply the inner product of two vectors. Given vectors x1 and x2 of equal length, the linear kernel is computed as the sum over the elementwise products: sum_i x1[i] * x2[i]. In PyTorch, this can be efficiently computed using torch.dot on 1D tensors.\n\nThe implementation converts inputs to PyTorch tensors, validates that they contain the same number of elements, flattens them to 1D, and applies torch.dot. Returning a Python scalar via .item() aligns with typical usage where a numeric result is printed or logged. This solution is efficient and uses vectorized operations that are well-optimized in PyTorch.",
  "solutionCode": "import torch\n\ndef kernel_function(x1, x2):\n    \"\"\"Compute the linear kernel (dot product) between two vectors.\n\n    Args:\n        x1: Array-like or torch.Tensor, any shape but must have the same number of elements as x2.\n        x2: Array-like or torch.Tensor, any shape but must have the same number of elements as x1.\n\n    Returns:\n        A Python scalar (int/float) containing the dot product of x1 and x2.\n    \"\"\"\n    # Convert inputs to tensors without unnecessary copying\n    t1 = torch.as_tensor(x1)\n    t2 = torch.as_tensor(x2)\n\n    # Ensure they contain the same number of elements\n    if t1.numel() != t2.numel():\n        raise ValueError(\"x1 and x2 must have the same number of elements for the dot product.\")\n\n    # Flatten to 1D (view is O(1))\n    t1 = t1.view(-1)\n    t2 = t2.view(-1)\n\n    # Compute dot product; torch.dot requires 1D tensors\n    result = torch.dot(t1, t2)\n\n    # Return a Python scalar for convenience\n    return result.item()\n\nif __name__ == \"__main__\":\n    # Example usage with PyTorch tensors\n    x1 = torch.tensor([1, 2, 3])\n    x2 = torch.tensor([4, 5, 6])\n    result = kernel_function(x1, x2)\n    print(result)  # Expected: 32\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)",
  "platform": "deepml"
};
