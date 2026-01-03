import { Problem } from '../../types';

export const DM_22_SIGMOID_ACTIVATION_FUNCTION_UNDERSTANDING: Problem = {
  "id": "dm_22_sigmoid_activation_function_understanding",
  "title": "Sigmoid Activation Function Understanding",
  "difficulty": "Easy",
  "tags": [
    "Neural Networks",
    "Activation Functions"
  ],
  "descriptionMarkdown": "Write a Python function that computes the output of the sigmoid activation function given an input value z. The function should return the output rounded to four decimal places.\n\nExample:\n- Input: z = 0\n- Output: 0.5\n\nReasoning:\nThe sigmoid function is defined as \u03c3(z) = 1 / (1 + exp(-z)). For z = 0, exp(\u22120) = 1, hence the output is 1 / (1 + 1) = 0.5.",
  "solutionExplanation": "The sigmoid activation function maps any real-valued input to the range (0, 1) using the formula \u03c3(z) = 1 / (1 + exp(\u2212z)). It is commonly used in neural networks to introduce non-linearity and to model probabilities in binary classification tasks. For a given scalar input z, we compute the exponential term and then apply the transformation.\n\nIn PyTorch, we can use torch.sigmoid, which is optimized and numerically more stable than implementing the formula manually with exponentials. After computing the sigmoid, we convert the result to a Python float and round it to four decimal places using the built-in round function, meeting the problem's output requirement.",
  "solutionCode": "import torch\n\ndef solution(z: float) -> float:\n    \"\"\"\n    Compute the sigmoid activation for input z and return the result\n    rounded to four decimal places.\n\n    Args:\n        z (float): Input scalar value.\n\n    Returns:\n        float: Sigmoid(z) rounded to 4 decimal places.\n    \"\"\"\n    # Convert input to a torch tensor for numerical stability and to use torch ops\n    t = torch.as_tensor(z, dtype=torch.float64)\n    # Use PyTorch's stable sigmoid implementation\n    y = torch.sigmoid(t)\n    # Convert to Python float and round to 4 decimals\n    return float(round(y.item(), 4))\n\nif __name__ == \"__main__\":\n    # Example usages\n    print(solution(0))       # Expected: 0.5\n    print(solution(2.0))     # ~0.8808\n    print(solution(-2.0))    # ~0.1192\n",
  "timeComplexity": "O(1)",
  "spaceComplexity": "O(1)",
  "platform": "deepml"
};
