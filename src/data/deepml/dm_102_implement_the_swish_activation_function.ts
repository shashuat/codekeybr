import { Problem } from '../../types';

export const DM_102_IMPLEMENT_THE_SWISH_ACTIVATION_FUNCTION: Problem = {
  "id": "dm_102_implement_the_swish_activation_function",
  "title": "Implement the Swish Activation Function",
  "difficulty": "Easy",
  "tags": [
    "Neural Networks",
    "Activation Functions"
  ],
  "descriptionMarkdown": "Implement the Swish activation function, a self-gated activation that often outperforms ReLU in deep networks. The Swish function is defined as:\n\nSwish(x) = x * sigmoid(x)\n\nWhere sigmoid(x) = 1 / (1 + exp(-x)).\n\nExample:\n- Input: swish(1)\n- Output: 0.7311\n\nReasoning: Swish(1) = 1 * sigmoid(1) \u2248 1 * 0.7311 = 0.7311.",
  "solutionExplanation": "Swish is an element-wise activation defined as x multiplied by the logistic sigmoid of x. Computing it efficiently and stably is straightforward in PyTorch using built-in vectorized operations. Specifically, we can evaluate Swish as x * torch.sigmoid(x), which leverages PyTorch's optimized kernels and supports autograd for backpropagation.\n\nThe implementation below provides both a functional interface (swish) that works with scalars and tensors, and an nn.Module (Swish) so it can be easily integrated into neural network architectures. For scalar inputs, we convert to a tensor, compute the activation, and return a Python float; for tensor inputs, we return a tensor of the same shape and dtype. This ensures compatibility with training pipelines and efficient batched computation.",
  "solutionCode": "import torch\nimport torch.nn as nn\nfrom typing import Union\n\nclass Swish(nn.Module):\n    \"\"\"PyTorch nn.Module implementation of the Swish activation.\n    Swish(x) = x * sigmoid(x)\n    \"\"\"\n    def forward(self, x: torch.Tensor) -> torch.Tensor:\n        # Element-wise: x * sigmoid(x)\n        return x * torch.sigmoid(x)\n\n\ndef swish(x: Union[float, int, torch.Tensor]) -> Union[float, torch.Tensor]:\n    \"\"\"Functional Swish that supports both scalars and tensors.\n\n    Args:\n        x: A scalar (float/int) or a torch.Tensor.\n    Returns:\n        The Swish activation with the same type behavior:\n        - If input is a tensor, returns a tensor.\n        - If input is a scalar, returns a Python float.\n    \"\"\"\n    if isinstance(x, torch.Tensor):\n        return x * torch.sigmoid(x)\n    # Handle Python scalar input\n    xt = torch.tensor(x, dtype=torch.get_default_dtype())\n    y = xt * torch.sigmoid(xt)\n    return float(y.item())\n\n\ndef solution():\n    \"\"\"Runs an example computation of Swish(1).\"\"\"\n    # Example: compute Swish(1) -> 0.7311 (approximately)\n    val = swish(1.0)\n    # Print to 4 decimal places to match the prompt's example format\n    print(f\"{val:.4f}\")\n    return val\n\n\nif __name__ == \"__main__\":\n    solution()\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(N)",
  "platform": "deepml"
};
