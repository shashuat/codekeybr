import { Problem } from '../../types';

export const DM_165_COMPUTE_DISCOUNTED_RETURN: Problem = {
  "id": "dm_165_compute_discounted_return",
  "title": "Compute Discounted Return",
  "difficulty": "Easy",
  "tags": [
    "Probability"
  ],
  "descriptionMarkdown": "Write a function to compute the discounted return for a sequence of rewards given a discount factor gamma (0 < gamma <= 1). The function should take a list or array-like of rewards and a discount factor gamma, and return the scalar value of the total discounted return.\n\nExample:\n- Input:\n  - rewards = [1, 1, 1]\n  - gamma = 0.5\n- Output: 1.75\n\nReasoning: Discounted return = 1*1 + 1*0.5 + 1*0.25 = 1.75",
  "solutionExplanation": "The discounted return for a sequence of rewards r_0, r_1, ..., r_{T-1} with discount factor gamma is defined as G = sum_{t=0}^{T-1} gamma^t * r_t. This weights earlier rewards more heavily than later ones when 0 < gamma < 1, capturing the notion of future reward discounting common in reinforcement learning.\n\nTo compute this efficiently and stably, we can iterate once over the rewards and maintain a running power of gamma. Starting with power = 1, at each step we add reward[t] * power to the total and then multiply power by gamma. This approach requires only O(1) extra space and a single pass over the rewards, avoiding the need to construct large power vectors.",
  "solutionCode": "import torch\n\ndef discounted_return(rewards, gamma: float) -> float:\n    \"\"\"\n    Compute the total discounted return for a sequence of rewards.\n\n    Args:\n        rewards (Sequence[float] or torch.Tensor): Rewards [r_0, r_1, ..., r_{T-1}].\n        gamma (float): Discount factor, must satisfy 0 < gamma <= 1.\n\n    Returns:\n        float: Total discounted return as a Python float.\n    \"\"\"\n    if not (0.0 < float(gamma) <= 1.0):\n        raise ValueError(\"gamma must be in the interval (0, 1].\")\n\n    r = torch.as_tensor(rewards, dtype=torch.float32)\n    if r.numel() == 0:\n        return 0.0\n\n    # Ensure 1-D\n    r = r.reshape(-1)\n\n    total = torch.tensor(0.0, dtype=r.dtype)\n    power = 1.0  # gamma^t maintained incrementally for numerical efficiency\n\n    # Single pass accumulation: total = sum_t r[t] * gamma^t\n    for t in range(r.numel()):\n        total = total + r[t] * power\n        power *= gamma\n\n    return float(total.item())\n\n\ndef solution():\n    # Example usage\n    rewards = [1, 1, 1]\n    gamma = 0.5\n    result = discounted_return(rewards, gamma)\n    print(result)  # Expected: 1.75\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)",
  "platform": "deepml"
};
