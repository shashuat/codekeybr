import { Problem } from '../../types';

export const DM_44_LEAKY_RELU_ACTIVATION_FUNCTION: Problem = {
  "id": "dm_44_leaky_relu_activation_function",
  "title": "Leaky ReLU Activation Function",
  "difficulty": "Easy",
  "tags": [
    "Neural Networks",
    "Activation Functions"
  ],
  "descriptionMarkdown": "Write a Python function `leaky_relu` that implements the Leaky Rectified Linear Unit (Leaky ReLU) activation function. The function should take a float `z` as input and an optional float `alpha`, with a default value of `0.01`, as the slope for negative inputs. The function should return the value after applying the Leaky ReLU function.\n\nDefinition:\n- Leaky ReLU: f(z) = max(z, alpha * z)\n\nExample:\n```\nInput:\nprint(leaky_relu(0))\nprint(leaky_relu(1))\nprint(leaky_relu(-1))\nprint(leaky_relu(-2, alpha=0.1))\n\nOutput:\n0\n1\n-0.01\n-0.2\n```\nReasoning:\n- For z = 0, the output is 0.\n- For z = 1, the output is 1.\n- For z = -1, the output is -0.01 (0.01 * -1).\n- For z = -2 with alpha = 0.1, the output is -0.2 (0.1 * -2).",
  "solutionExplanation": "Leaky ReLU is a commonly used activation function that addresses the \"dying ReLU\" problem by allowing a small, non-zero gradient when the input is negative. Mathematically, it is defined as f(z) = max(z, alpha * z), where alpha is a small positive constant (e.g., 0.01). This ensures that neurons do not become inactive due to zero gradients for negative inputs, improving training stability.\n\nIn PyTorch, the Leaky ReLU operation is available as torch.nn.functional.leaky_relu, which efficiently applies the function on tensors. For this problem, we wrap the scalar input into a 0-dimensional tensor, apply the function using the provided alpha as negative_slope, and then convert the result back to a Python float. This approach uses optimized tensor operations while matching the function signature required by the prompt.",
  "solutionCode": "import torch\nimport torch.nn as nn\nimport torch.nn.functional as F\n\n\ndef leaky_relu(z: float, alpha: float = 0.01) -> float:\n    \"\"\"\n    Compute the Leaky ReLU activation for a scalar input using PyTorch.\n\n    Args:\n        z (float): Input value.\n        alpha (float, optional): Slope for negative inputs. Default is 0.01.\n\n    Returns:\n        float: Result of applying Leaky ReLU to z.\n    \"\"\"\n    if not isinstance(alpha, (int, float)):\n        raise TypeError(\"alpha must be a real number (int or float)\")\n    # Create a 0-dim tensor from the input and apply Leaky ReLU\n    x = torch.tensor(z, dtype=torch.get_default_dtype())\n    y = F.leaky_relu(x, negative_slope=float(alpha))\n    return float(y.item())\n\n\ndef solution():\n    # Example usage consistent with the prompt\n    print(leaky_relu(0))\n    print(leaky_relu(1))\n    print(leaky_relu(-1))\n    print(leaky_relu(-2, alpha=0.1))\n\n\nif __name__ == \"__main__\":\n    solution()\n",
  "timeComplexity": "O(1)",
  "spaceComplexity": "O(1)",
  "platform": "deepml"
};
