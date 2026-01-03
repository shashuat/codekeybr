import { Problem } from '../../types';

export const DM_81_POISSON_DISTRIBUTION_PROBABILITY_CALCULATOR: Problem = {
  "id": "dm_81_poisson_distribution_probability_calculator",
  "title": "Poisson Distribution Probability Calculator",
  "difficulty": "Easy",
  "tags": [
    "Probability"
  ],
  "descriptionMarkdown": "Write a Python function to calculate the probability of observing exactly k events in a fixed interval using the Poisson distribution formula. The function should take k (number of events) and lam (mean rate of occurrences) as inputs and return the probability rounded to 5 decimal places.\n\nExample:\n- Input: k = 3, lam = 5\n- Output: 0.14037\n\nReasoning: The function calculates the probability for a given number of events occurring in a fixed interval, based on the mean rate of occurrences.",
  "solutionExplanation": "The Poisson distribution models the probability of observing k events in a fixed interval when events occur independently at a constant average rate \u03bb (lambda). The probability mass function (PMF) is given by P(X = k) = e^{-\u03bb} \u03bb^k / k!, where k is a non-negative integer and \u03bb \u2265 0.\n\nFor numerical stability and performance, we compute the PMF in the log-domain using PyTorch operations: log P = k * log(\u03bb) - \u03bb - lgamma(k + 1), where lgamma(n) = log((n-1)!) allows us to avoid explicitly computing factorials. We also handle the edge case \u03bb = 0 separately: P(X = 0) = 1 and P(X > 0) = 0. Finally, we exponentiate the log probability, convert to a Python float, and round to 5 decimal places as required.",
  "solutionCode": "import torch\nimport torch.nn as nn\n\ndef poisson_probability(k: int, lam: float) -> float:\n    \"\"\"\n    Calculate the Poisson probability P(X = k) for a given mean rate lam.\n    Returns the probability rounded to 5 decimal places.\n\n    Args:\n        k (int): Number of events (non-negative integer).\n        lam (float): Mean rate (lambda), must be non-negative.\n\n    Returns:\n        float: Probability rounded to 5 decimal places.\n    \"\"\"\n    if not isinstance(k, int):\n        raise TypeError(\"k must be an integer\")\n    if k < 0:\n        raise ValueError(\"k must be non-negative\")\n\n    lam_t = torch.as_tensor(lam, dtype=torch.float64)\n    if lam_t.item() < 0:\n        raise ValueError(\"lam must be non-negative\")\n\n    # Handle lambda = 0 explicitly to avoid log(0)\n    if lam_t.item() == 0.0:\n        prob = 1.0 if k == 0 else 0.0\n        return round(prob, 5)\n\n    # Convert k to tensor for torch ops\n    k_t = torch.as_tensor(float(k), dtype=torch.float64)\n\n    # Compute log PMF for numerical stability: log P = k*log(lam) - lam - lgamma(k+1)\n    log_p = k_t * torch.log(lam_t) - lam_t - torch.lgamma(k_t + 1.0)\n    p = torch.exp(log_p)\n\n    return round(p.item(), 5)\n\n\ndef solution(k: int, lam: float) -> float:\n    \"\"\"Wrapper solution function as required by the interface.\"\"\"\n    return poisson_probability(k, lam)\n\n\nif __name__ == \"__main__\":\n    # Example usage\n    print(solution(3, 5))  # Expected: 0.14037\n",
  "timeComplexity": "O(1)",
  "spaceComplexity": "O(1)",
  "platform": "deepml"
};
