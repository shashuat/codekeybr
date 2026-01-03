import { Problem } from '../../types';

export const DM_100_IMPLEMENT_THE_SOFTSIGN_ACTIVATION_FUNCTION: Problem = {
  "id": "dm_100_implement_the_softsign_activation_function",
  "title": "Implement the Softsign Activation Function",
  "difficulty": "Easy",
  "tags": [
    "Neural Networks",
    "Activation Functions"
  ],
  "descriptionMarkdown": "Implement the Softsign activation function, a smooth nonlinearity used in neural networks. The Softsign function is defined as:\n\nf(x) = x / (1 + |x|)\n\nIt smoothly maps real numbers to the range (-1, 1). Your task is to compute the Softsign value for a given input.\n\nExample:\n- Input: softsign(1)\n- Output: 0.5",
  "solutionExplanation": "Softsign is a bounded, smooth activation function defined as f(x) = x / (1 + |x|). As |x| grows large, the denominator dominates, making the output approach -1 or 1 asymptotically. This smoothness can help optimization by avoiding sharp saturations seen in some other activations while still keeping outputs bounded.\n\nIn PyTorch, we can implement Softsign using vectorized tensor operations: take the absolute value, add 1, and divide the original input element-wise. Autograd will automatically compute gradients, where the analytical derivative is f'(x) = 1 / (1 + |x|)^2. The provided implementation supports both scalar and tensor inputs and includes a small rounding step (to 4 decimals) to match the problem's expected output format.",
  "solutionCode": "import torch\nimport torch.nn as nn\n\n\ndef _round_tensor(x: torch.Tensor, decimals: int = 4) -> torch.Tensor:\n    \"\"\"Round a tensor to a given number of decimal places without relying on\n    torch.round(decimals=...). Compatible across PyTorch versions.\n    \"\"\"\n    if decimals <= 0:\n        return torch.round(x)\n    factor = 10.0 ** decimals\n    return torch.round(x * factor) / factor\n\n\nclass Softsign(nn.Module):\n    \"\"\"Custom Softsign activation module: f(x) = x / (1 + |x|).\"\"\"\n    def forward(self, x: torch.Tensor) -> torch.Tensor:\n        return x / (1.0 + x.abs())\n\n\ndef softsign(x):\n    \"\"\"Compute Softsign for a scalar, list-like, or tensor input.\n\n    For scalar inputs, returns a Python float rounded to 4 decimals.\n    For tensor inputs, returns a tensor rounded to 4 decimals.\n    \"\"\"\n    t = torch.as_tensor(x, dtype=torch.float32)\n    y = t / (1.0 + t.abs())\n    y = _round_tensor(y, decimals=4)\n\n    # Preserve tensor type if input was a tensor\n    if isinstance(x, torch.Tensor):\n        return y\n\n    # Otherwise, return Python-native types\n    if y.numel() == 1:\n        return float(y.item())\n    return y.tolist()\n\n\ndef solution():\n    # Example usage\n    print(softsign(1.0))  # Expected: 0.5\n\n    tensor_in = torch.tensor([-2.0, 0.0, 3.0])\n    print(softsign(tensor_in))  # Tensor rounded to 4 decimals\n\n    # Compare with built-in PyTorch Softsign\n    builtin = nn.Softsign()\n    print(_round_tensor(builtin(tensor_in), 4))\n\n    # Autograd demonstration: derivative at x=1 should be 1/(1+|1|)^2 = 0.25\n    x = torch.tensor([1.0], requires_grad=True)\n    y = Softsign()(x).sum()\n    y.backward()\n    print(round(float(x.grad.item()), 4))  # Expected: 0.25\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)",
  "platform": "deepml"
};
