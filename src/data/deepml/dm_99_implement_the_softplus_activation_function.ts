import { Problem } from '../../types';

export const DM_99_IMPLEMENT_THE_SOFTPLUS_ACTIVATION_FUNCTION: Problem = {
  "id": "dm_99_implement_the_softplus_activation_function",
  "title": "Implement the Softplus Activation Function",
  "difficulty": "Easy",
  "tags": [
    "Neural Networks",
    "Activation Functions"
  ],
  "descriptionMarkdown": "Implement the Softplus activation function, a smooth approximation of ReLU. For an input x, Softplus is defined as softplus(x) = log(1 + e^x). Your task is to compute this value while handling edge cases to avoid numerical overflow or underflow.\n\nRequirements:\n- Use a numerically stable formulation of Softplus.\n- Implement the solution in PyTorch.\n\nExample:\n- Input: softplus(2)\n- Output: 2.1269",
  "solutionExplanation": "The Softplus function is defined as log(1 + exp(x)), which can suffer from numerical issues: for large positive x, exp(x) can overflow, and for large negative x, exp(x) underflows to zero. To address this, we use a numerically stable rearrangement:\n\nsoftplus(x) = max(x, 0) + log1p(exp(-|x|))\n\nThis formulation ensures that we never compute exp(x) for large positive x (we compute exp(-|x|) instead), and we use log1p to maintain precision when its argument is close to zero. An equivalent stable approach uses a branch with torch.where: for x > 0 compute x + log1p(exp(-x)), otherwise compute log1p(exp(x)).\n\nIn PyTorch, we implement this with tensor operations (torch.where, torch.exp, torch.log1p), ensuring it works for both scalars and tensors. For a single Python float input, we return a rounded float to match the example format.",
  "solutionCode": "import torch\nimport torch.nn as nn\n\ndef softplus(x):\n    \"\"\"\n    Compute the Softplus activation in a numerically stable way.\n\n    Supports Python scalars or torch.Tensor inputs. For a scalar input,\n    returns a rounded float with 4 decimal places (to match the example).\n    For tensor input, returns a tensor of the same shape/dtype.\n    \"\"\"\n    # Convert input to a tensor (default float dtype) without copying if already a tensor\n    t = torch.as_tensor(x, dtype=torch.get_default_dtype())\n\n    # Numerically stable softplus using branching:\n    # softplus(x) = x + log1p(exp(-x))        if x > 0\n    #            = log1p(exp(x))              otherwise\n    y = torch.where(t > 0, t + torch.log1p(torch.exp(-t)), torch.log1p(torch.exp(t)))\n\n    # If input was a Python scalar, return a rounded float as per the example\n    if not isinstance(x, torch.Tensor) and y.numel() == 1:\n        return round(float(y.item()), 4)\n    return y\n\n\ndef solution():\n    # Example usage\n    print(softplus(2))        # Expected: 2.1269\n    # Tensor example\n    x = torch.tensor([-100.0, -1.0, 0.0, 1.0, 100.0])\n    print(softplus(x))        # Tensor output with stable computation\n\nif __name__ == \"__main__\":\n    solution()\n",
  "timeComplexity": "O(1)",
  "spaceComplexity": "O(1)",
  "platform": "deepml"
};
