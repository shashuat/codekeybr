import { Problem } from '../../types';

export const DM_97_IMPLEMENT_THE_ELU_ACTIVATION_FUNCTION: Problem = {
  "id": "dm_97_implement_the_elu_activation_function",
  "title": "Implement the ELU Activation Function",
  "difficulty": "Easy",
  "tags": [
    "Neural Networks",
    "Activation Functions"
  ],
  "descriptionMarkdown": "Implement the ELU (Exponential Linear Unit) activation function, which helps mitigate the limitations of ReLU by permitting small negative outputs for negative inputs.\n\nDefine a function:\n\n- def elu(x: float, alpha: float = 1.0) -> float\n\nThe ELU activation is:\n- ELU(x) = x, if x >= 0\n- ELU(x) = alpha * (exp(x) - 1), if x < 0\n\nReturn the activation value rounded to 4 decimal places.\n\nExample:\n- Input: `elu(-1)`\n- Output: `-0.6321`",
  "solutionExplanation": "The ELU (Exponential Linear Unit) activation function is designed to address some limitations of ReLU by allowing negative outputs for negative inputs, which helps reduce bias shift and can improve learning dynamics. ELU is defined piecewise: it is the identity for non-negative inputs and smoothly transitions to an exponential form for negative inputs. This smoothness makes ELU differentiable everywhere, which is beneficial for gradient-based optimization.\n\nGiven an input x and parameter alpha (commonly set to 1.0), ELU is computed as x for x >= 0 and alpha * (exp(x) - 1) for x < 0. In PyTorch, we can implement this efficiently using tensor operations like torch.where and torch.expm1 (for numerical stability when computing exp(x) - 1). The function returns a scalar rounded to four decimal places to match the example output.",
  "solutionCode": "import torch\nimport torch.nn as nn\n\ndef elu(x: float, alpha: float = 1.0) -> float:\n    \"\"\"\n    Compute the ELU activation for a scalar input using PyTorch ops.\n\n    Args:\n        x (float): Input value.\n        alpha (float): ELU parameter for negative values (default: 1.0).\n\n    Returns:\n        float: ELU activation value rounded to 4 decimals.\n    \"\"\"\n    # Convert to a 0-dim tensor for PyTorch operations\n    xt = torch.tensor(x, dtype=torch.float32)\n    # Use expm1 for numerical stability: exp(x) - 1\n    neg_branch = torch.tensor(alpha, dtype=xt.dtype) * torch.expm1(xt)\n    val = torch.where(xt >= 0, xt, neg_branch)\n    return round(float(val.item()), 4)\n\n\ndef elu_tensor(x: torch.Tensor, alpha: float = 1.0) -> torch.Tensor:\n    \"\"\"\n    Vectorized ELU for tensors. Useful for batch inputs.\n\n    Args:\n        x (torch.Tensor): Input tensor of any shape.\n        alpha (float): ELU parameter for negative values.\n\n    Returns:\n        torch.Tensor: Tensor with ELU applied element-wise.\n    \"\"\"\n    return torch.where(x >= 0, x, torch.tensor(alpha, dtype=x.dtype, device=x.device) * torch.expm1(x))\n\n\ndef solution():\n    # Example usage: scalar\n    val = elu(-1.0)  # Expected: -0.6321\n    print(val)\n\n    # Example usage: tensor (not required, shown for completeness)\n    x = torch.tensor([-1.0, 0.0, 1.0])\n    y = elu_tensor(x, alpha=1.0)\n    print(y.tolist())  # Expected approx: [-0.6321, 0.0, 1.0]\n\n    return val\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)",
  "platform": "deepml"
};
