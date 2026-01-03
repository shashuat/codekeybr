import { Problem } from '../../types';

export const DM_103_IMPLEMENT_THE_SELU_ACTIVATION_FUNCTION: Problem = {
  "id": "dm_103_implement_the_selu_activation_function",
  "title": "Implement the SELU Activation Function",
  "difficulty": "Easy",
  "tags": [
    "Neural Networks",
    "Activation Functions"
  ],
  "descriptionMarkdown": "Implement the SELU (Scaled Exponential Linear Unit) activation function, a self-normalizing variant of ELU. Your task is to compute the SELU value for a given input while ensuring numerical stability.\n\nSELU(x) = \u03bb * (x if x > 0 else \u03b1 * (exp(x) - 1))\n\nUse the standard constants:\n- \u03b1 (alpha) = 1.6732632423543772\n- \u03bb (scale) = 1.0507009873554804\n\nExample:\n- Input: selu(-1.0)\n- Output: -1.1113 (approximately)\n\nReasoning:\nFor x = -1.0, SELU(-1.0) = 1.0507009873554804 \u00d7 1.6732632423543772 \u00d7 (exp(-1.0) - 1) \u2248 -1.1113.",
  "solutionExplanation": "SELU is defined as a scaled version of ELU that encourages self-normalization in deep networks. Formally, SELU(x) = \u03bb * ELU(x; \u03b1), where ELU(x; \u03b1) = x for x > 0 and \u03b1*(exp(x) - 1) for x \u2264 0. The recommended constants are \u03b1 = 1.6732632423543772 and \u03bb = 1.0507009873554804, as introduced in the SELU paper.\n\nTo ensure numerical stability, particularly for small x near zero on the negative side, we compute exp(x) - 1 using the expm1 operation, which is more accurate than exp(x) - 1 when x is small. We implement the function in a vectorized way using torch.where so it works efficiently on tensors and supports autograd for backpropagation. The implementation accepts both scalars and tensors and returns a tensor.",
  "solutionCode": "import torch\nimport torch.nn as nn\n\naLPHA = 1.6732632423543772\nSCALE = 1.0507009873554804\n\ndef selu(x: torch.Tensor) -> torch.Tensor:\n    \"\"\"\n    Compute the SELU activation in a numerically stable, vectorized manner.\n\n    SELU(x) = SCALE * (x if x > 0 else ALPHA * (exp(x) - 1))\n\n    Args:\n        x: A scalar or tensor input.\n    Returns:\n        A tensor with SELU applied elementwise.\n    \"\"\"\n    t = torch.as_tensor(x)\n    # Use expm1 for better numerical stability on negative branch\n    neg_branch = aLPHA * torch.expm1(t)\n    elu = torch.where(t > 0, t, neg_branch)\n    return SCALE * elu\n\nclass SELUCustom(nn.Module):\n    \"\"\"nn.Module wrapper for the custom SELU activation.\"\"\"\n    def forward(self, input: torch.Tensor) -> torch.Tensor:\n        return selu(input)\n\ndef solution():\n    # Example usage\n    x_scalar = torch.tensor(-1.0)\n    y_scalar = selu(x_scalar)\n\n    x_vec = torch.tensor([-1.0, 0.0, 1.0])\n    y_vec = selu(x_vec)\n\n    # Print example outputs\n    print(\"SELU(-1.0) \u2248\", float(y_scalar))\n    print(\"SELU([-1.0, 0.0, 1.0]) =\", y_vec.tolist())\n\n    # Return the scalar example result\n    return float(y_scalar)\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)",
  "platform": "deepml"
};
