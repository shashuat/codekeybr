import { Problem } from '../../types';

export const DM_147_GELU_ACTIVATION_FUNCTION: Problem = {
  "id": "dm_147_gelu_activation_function",
  "title": "GeLU Activation Function",
  "difficulty": "Easy",
  "tags": [
    "Neural Networks",
    "Activation Functions"
  ],
  "descriptionMarkdown": "Implement a Python function that applies the GELU (Gaussian Error Linear Unit) activation function to an array of logits. Use the common tanh-based approximation of GELU and round each output to four decimal places, returning a result of the same shape.\n\nExample:\n- Input: `[-2.0, -1.0, 0.0, 1.0, 2.0]`\n- Output: `[-0.0454, -0.1588, 0.0000, 0.8412, 1.9546]`\n\nNote: Use vectorized operations. The GELU approximation formula is:\nGELU(x) \u2248 0.5 * x * (1 + tanh(\u221a(2/\u03c0) * (x + 0.044715 * x\u00b3))).",
  "solutionExplanation": "The Gaussian Error Linear Unit (GELU) is a smooth activation function that weights inputs by their value and the probability of being positive under a Gaussian distribution. A widely used, efficient approximation of GELU uses a tanh-based formula: GELU(x) \u2248 0.5 * x * (1 + tanh(\u221a(2/\u03c0) * (x + 0.044715 * x\u00b3))). This approximation closely matches the exact definition that involves the error function, while being faster and more numerically convenient for deep learning workloads.\n\nTo solve the task, we implement the tanh approximation in a vectorized manner using PyTorch tensor operations to ensure efficiency and GPU compatibility. After computing the GELU outputs, we round the results to four decimal places using elementwise rounding with a scaling trick (multiply by 1e4, round, then divide by 1e4). The function preserves the input tensor's shape and works for arbitrary tensor shapes. An example demonstrates that the outputs match the expected rounded values.",
  "solutionCode": "import torch\nimport torch.nn as nn\nfrom typing import Optional\n\ndef gelu_approx(x: torch.Tensor) -> torch.Tensor:\n    \"\"\"\n    Apply the GELU activation (tanh-based approximation) to a tensor and\n    round the result to 4 decimal places.\n\n    GELU(x) \u2248 0.5 * x * (1 + tanh(sqrt(2/pi) * (x + 0.044715 * x^3)))\n\n    Args:\n        x: Input tensor of any shape.\n\n    Returns:\n        A tensor of the same shape as x with GELU applied and rounded to 4 decimals.\n    \"\"\"\n    # sqrt(2/pi) constant for the tanh-based GELU approximation\n    sqrt_2_over_pi = 0.7978845608028654\n\n    # Compute the tanh approximation of GELU in a fully vectorized manner\n    y = 0.5 * x * (1.0 + torch.tanh(sqrt_2_over_pi * (x + 0.044715 * x.pow(3))))\n\n    # Round to 4 decimal places: multiply, round, then divide\n    y = torch.round(y * 1e4) / 1e4\n    return y\n\nclass GELUApprox(nn.Module):\n    \"\"\"nn.Module wrapper for the tanh-based GELU approximation with rounding.\"\"\"\n    def forward(self, x: torch.Tensor) -> torch.Tensor:\n        return gelu_approx(x)\n\n\ndef solution():\n    # Example usage\n    logits = torch.tensor([-2.0, -1.0, 0.0, 1.0, 2.0])\n    activated = gelu_approx(logits)\n    # Expected: tensor([-0.0454, -0.1588,  0.0000,  0.8412,  1.9546])\n    print(activated)\n    return activated\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)",
  "platform": "deepml"
};
