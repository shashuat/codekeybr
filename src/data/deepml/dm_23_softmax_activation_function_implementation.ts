import { Problem } from '../../types';

export const DM_23_SOFTMAX_ACTIVATION_FUNCTION_IMPLEMENTATION: Problem = {
  "id": "dm_23_softmax_activation_function_implementation",
  "title": "Softmax Activation Function Implementation",
  "difficulty": "Easy",
  "tags": [
    "Activation Functions",
    "Neural Networks",
    "Probability"
  ],
  "descriptionMarkdown": "Write a Python function that computes the softmax activation for a given list of scores. The function should return the softmax values as a list, each rounded to four decimal places.\n\nExample:\n- Input: `scores = [1, 2, 3]`\n- Output: `[0.0900, 0.2447, 0.6652]`\n\nThe softmax function converts a list of values into a probability distribution where the probabilities are proportional to the exponential of each element divided by the sum of the exponentials of all elements.",
  "solutionExplanation": "Softmax maps a real-valued vector into a probability distribution. For a vector x, the i-th output is exp(x_i) divided by the sum of exp(x_j) over all j. This ensures all outputs are positive and sum to 1. In practice, we use a numerically stable variant by subtracting the maximum value from the input vector before exponentiation. This does not change the resulting probabilities but prevents overflow in the exponential.\n\nUsing PyTorch, we convert the input list to a tensor, shift it by its maximum, exponentiate, and normalize by the sum. Finally, we round each probability to four decimal places. The implementation uses vectorized tensor operations for clarity and efficiency.",
  "solutionCode": "import torch\nfrom typing import List\n\n\ndef softmax(scores: List[float]) -> List[float]:\n    \"\"\"\n    Compute the softmax of a list of scores and return values rounded to 4 decimals.\n\n    Args:\n        scores: List of numeric scores (floats or ints).\n\n    Returns:\n        List[float]: Softmax probabilities rounded to four decimal places.\n    \"\"\"\n    if not isinstance(scores, (list, tuple)):\n        raise TypeError(\"scores must be a list or tuple of numbers\")\n    if len(scores) == 0:\n        return []\n\n    # Convert to tensor (float for numerical stability/precision)\n    x = torch.tensor(scores, dtype=torch.float32)\n\n    # Numerically stable softmax: subtract max before exp\n    x_shifted = x - x.max()\n    exps = torch.exp(x_shifted)\n    probs = exps / exps.sum()\n\n    # Round to 4 decimals (torch.round rounds to integers, so scale first)\n    probs_rounded = torch.round(probs * 10000) / 10000\n\n    return probs_rounded.tolist()\n\n\nif __name__ == \"__main__\":\n    # Example usage\n    scores = [1, 2, 3]\n    print(softmax(scores))  # Expected: [0.09, 0.2447, 0.6652] (values rounded to 4 decimals)\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(N)",
  "platform": "deepml"
};
