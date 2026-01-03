import { Problem } from '../../types';

export const DM_39_IMPLEMENTATION_OF_LOG_SOFTMAX_FUNCTION: Problem = {
  "id": "dm_39_implementation_of_log_softmax_function",
  "title": "Implementation of Log Softmax Function",
  "difficulty": "Easy",
  "tags": [
    "Neural Networks",
    "Activation Functions",
    "Probability"
  ],
  "descriptionMarkdown": "In machine learning and statistics, the softmax function converts a vector of scores into probabilities. The log-softmax function is the logarithm of the softmax function and is often preferred for numerical stability when dealing with large values.\n\nTask: Given a 1D array of scores, implement a function to compute the log-softmax of the array.\n\nExample:\n\nInput:\n\nA = [1, 2, 3]\n\nOutput:\n\n[-2.4076, -1.4076, -0.4076]\n\nExplanation: The log-softmax is applied element-wise to the input vector [1, 2, 3], producing the corresponding log probabilities.",
  "solutionExplanation": "The log-softmax of a vector x is defined as log_softmax(x)_i = x_i - log(sum_j exp(x_j)). Computing softmax followed by a logarithm directly can suffer from numerical instability when x contains large values. Instead, we use a stable formulation that leverages the log-sum-exp trick.\n\nThe stable approach computes logsumexp(x) = m + log(sum_j exp(x_j - m)), where m = max(x). Subtracting the maximum before exponentiation avoids overflow while preserving correctness. In PyTorch, torch.logsumexp implements this stably and efficiently. Therefore, we can compute log-softmax as x - torch.logsumexp(x, dim), which is both concise and numerically robust.",
  "solutionCode": "import torch\nfrom typing import Optional\n\n\ndef log_softmax(scores: torch.Tensor) -> torch.Tensor:\n    \"\"\"\n    Compute the log-softmax of a 1D tensor in a numerically stable way.\n\n    Args:\n        scores: 1D torch.Tensor of shape (N,)\n\n    Returns:\n        torch.Tensor of shape (N,) containing log-softmax values.\n    \"\"\"\n    if scores.dim() != 1:\n        raise ValueError(f\"Expected a 1D tensor, got shape {tuple(scores.shape)}\")\n\n    # Use torch.logsumexp for numerical stability (implements the max-shift trick internally)\n    lse = torch.logsumexp(scores, dim=0)  # scalar\n    return scores - lse\n\n\ndef solution():\n    \"\"\"\n    Example usage demonstrating the log-softmax computation.\n    \"\"\"\n    # Example input\n    A = torch.tensor([1.0, 2.0, 3.0])\n\n    # Compute log-softmax\n    out = log_softmax(A)\n\n    # Print result (expected approx: [-2.4076, -1.4076, -0.4076])\n    print(out)\n    return out\n\n\nif __name__ == \"__main__\":\n    solution()\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)",
  "platform": "deepml"
};
