import { Problem } from '../../types';

export const DM_42_IMPLEMENT_RELU_ACTIVATION_FUNCTION: Problem = {
  "id": "dm_42_implement_relu_activation_function",
  "title": "Implement ReLU Activation Function",
  "difficulty": "Easy",
  "tags": [
    "Neural Networks",
    "Activation Functions"
  ],
  "descriptionMarkdown": "Implement the Rectified Linear Unit (ReLU) activation function.\n\nWrite a Python function `relu` that takes a single float as input and returns the value after applying the ReLU function. ReLU returns the input if it's greater than 0; otherwise, it returns 0.\n\nExample:\n\n```\nprint(relu(0))\nprint(relu(1))\nprint(relu(-1))\n```\n\nExpected behavior:\n- `relu(0)` -> `0`\n- `relu(1)` -> `1`\n- `relu(-1)` -> `0`",
  "solutionExplanation": "The Rectified Linear Unit (ReLU) is a widely used activation function in neural networks defined as ReLU(x) = max(0, x). It preserves positive inputs and clips negative inputs to zero, introducing non-linearity while being computationally efficient.\n\nFor a scalar input, we can implement ReLU directly using PyTorch by converting the input to a tensor, applying `torch.nn.functional.relu` (which efficiently computes max(0, x)), and converting the result back to a Python float. Using PyTorch ensures consistency with deep learning workflows and leverages optimized backend operations. This implementation also naturally extends to vectorized inputs if needed.",
  "solutionCode": "import torch\nimport torch.nn.functional as F\n\ndef relu(z: float) -> float:\n    \"\"\"\n    Apply the Rectified Linear Unit (ReLU) activation to a scalar input.\n\n    Args:\n        z (float): Input scalar value.\n\n    Returns:\n        float: Result of max(0, z).\n    \"\"\"\n    # Convert to a float32 tensor to ensure compatibility with PyTorch ops\n    t = torch.tensor(z, dtype=torch.float32)\n    # Apply ReLU using PyTorch's optimized implementation\n    out = F.relu(t)\n    # Convert back to a native Python float for the expected return type\n    return out.item()\n\n\ndef solution():\n    \"\"\"Demonstrates the relu function with example inputs.\"\"\"\n    print(relu(0))   # 0.0\n    print(relu(1))   # 1.0\n    print(relu(-1))  # 0.0\n\n    # Note: For batched/tensor inputs, you can use PyTorch directly:\n    # x = torch.tensor([-2.0, 0.0, 3.5])\n    # y = F.relu(x)  # tensor([0.0, 0.0, 3.5])\n",
  "timeComplexity": "O(1)",
  "spaceComplexity": "O(1)",
  "platform": "deepml"
};
