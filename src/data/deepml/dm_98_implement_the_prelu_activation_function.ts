import { Problem } from '../../types';

export const DM_98_IMPLEMENT_THE_PRELU_ACTIVATION_FUNCTION: Problem = {
  "id": "dm_98_implement_the_prelu_activation_function",
  "title": "Implement the PReLU Activation Function",
  "difficulty": "Easy",
  "tags": [
    "Neural Networks",
    "Activation Functions"
  ],
  "descriptionMarkdown": "Implement the PReLU (Parametric ReLU) activation function, a variant of ReLU with a learnable slope for negative inputs. For an input x and parameter alpha (default 0.25), compute:\n\n- PReLU(x) = x if x >= 0\n- PReLU(x) = alpha * x if x < 0\n\nExample:\n\nInput:\n\n```\nprelu(-2.0, alpha=0.25)\n```\n\nOutput:\n\n```\n-0.5\n```\n\nReasoning: For x = -2.0 and alpha = 0.25, PReLU(x) = 0.25 \u00d7 (-2.0) = -0.5.",
  "solutionExplanation": "PReLU introduces a learnable parameter alpha that scales negative inputs, allowing the model to learn the appropriate negative slope during training instead of fixing it to zero as in ReLU or a small constant as in Leaky ReLU. The forward definition is piecewise: f(x) = x for x >= 0 and f(x) = alpha * x for x < 0.\n\nIn PyTorch, this can be implemented efficiently using torch.where to select between x and alpha * x. Although the prompt asks for a scalar function, we also provide a vectorized tensor version that supports broadcasting and can be used in practical neural network code. Both versions are compatible with PyTorch's autograd, making them suitable for gradient-based optimization if integrated into a training pipeline.",
  "solutionCode": "import torch\nimport torch.nn as nn\n\ndef prelu(x: float, alpha: float = 0.25) -> float:\n    \"\"\"\n    Implements the Parametric ReLU (PReLU) activation for a scalar input.\n\n    PReLU(x) = x                if x >= 0\n               alpha * x        if x < 0\n\n    Args:\n        x (float): Input value.\n        alpha (float): Slope parameter for negative values (default: 0.25).\n\n    Returns:\n        float: PReLU activation value.\n    \"\"\"\n    # Convert inputs to tensors for computation\n    x_t = torch.tensor(x, dtype=torch.get_default_dtype())\n    a_t = torch.tensor(alpha, dtype=torch.get_default_dtype())\n\n    # Compute PReLU using vectorized where\n    y = torch.where(x_t >= 0, x_t, a_t * x_t)\n\n    # Return as Python float\n    return float(y.item())\n\n\ndef prelu_tensor(x: torch.Tensor, alpha = 0.25) -> torch.Tensor:\n    \"\"\"\n    Vectorized PReLU for tensor inputs with broadcasting support.\n\n    Args:\n        x (torch.Tensor): Input tensor.\n        alpha (float or torch.Tensor): Slope for negative values. If a tensor,\n            it will broadcast to x's shape.\n\n    Returns:\n        torch.Tensor: Tensor after applying PReLU element-wise.\n    \"\"\"\n    a_t = torch.as_tensor(alpha, dtype=x.dtype, device=x.device)\n    return torch.where(x >= 0, x, a_t * x)\n\n\ndef solution():\n    # Example scalar usage (as in the prompt)\n    result = prelu(-2.0, alpha=0.25)\n    print(result)  # Expected: -0.5\n\n    # Example tensor usage\n    x = torch.tensor([-2.0, 0.0, 3.0])\n    y = prelu_tensor(x, alpha=0.25)\n    print(y.tolist())  # Expected: [-0.5, 0.0, 3.0]\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)",
  "platform": "deepml"
};
