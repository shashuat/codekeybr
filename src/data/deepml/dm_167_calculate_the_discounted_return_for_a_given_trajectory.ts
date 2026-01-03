import { Problem } from '../../types';

export const DM_167_CALCULATE_THE_DISCOUNTED_RETURN_FOR_A_GIVEN_TRAJECTORY: Problem = {
  "id": "dm_167_calculate_the_discounted_return_for_a_given_trajectory",
  "title": "Calculate the Discounted Return for a Given Trajectory",
  "difficulty": "Easy",
  "tags": [
    "Probability"
  ],
  "descriptionMarkdown": "Compute the discounted return for a given sequence of rewards and a discount factor gamma. Given rewards R = [R_{t+1}, R_{t+2}, ..., R_{t+T}] and discount factor 0 <= gamma <= 1, the discounted return is:\n\nG_t = sum_{k=0}^{T-1} gamma^k * R_{t+k+1}\n\nExample:\n- Input: rewards = [1, 2, 3, 4], gamma = 0.9\n- Output: 8.146\n- Reasoning: G = 1 + 0.9^1 * 2 + 0.9^2 * 3 + 0.9^3 * 4 = 1 + 1.8 + 2.43 + 2.916 = 8.146",
  "solutionExplanation": "The discounted return G_t aggregates future rewards while exponentially down-weighting more distant rewards using the discount factor gamma. This is a fundamental quantity in reinforcement learning that captures the cumulative value of a trajectory from a given time step, balancing immediate and future rewards.\n\nTo compute G_t efficiently, we iterate over the rewards in reverse order and maintain a running accumulator G. For each reward r in reversed(rewards), we update G = r + gamma * G. This avoids computing powers of gamma explicitly or allocating additional arrays, leading to an O(N) time and O(1) extra space solution. Using PyTorch tensors ensures compatibility with ML pipelines and enables straightforward CPU/GPU execution if needed.\n\nWe implement input validation for gamma, convert inputs to a 1D torch tensor of dtype float64 for numerical precision, and return a Python float for convenience.",
  "solutionCode": "import torch\n\ndef discounted_return(rewards, gamma: float) -> float:\n    \"\"\"\n    Compute the discounted return G_t for a sequence of rewards.\n\n    Args:\n        rewards (Sequence[float or int or torch.Tensor]): Rewards [R_{t+1}, R_{t+2}, ...].\n        gamma (float): Discount factor in [0, 1].\n\n    Returns:\n        float: The discounted return G_t.\n    \"\"\"\n    if not (0.0 <= float(gamma) <= 1.0):\n        raise ValueError(\"gamma must be in the range [0, 1].\")\n\n    # Convert rewards to a 1D float64 tensor for precision\n    r = torch.as_tensor(rewards, dtype=torch.float64).flatten()\n    if r.numel() == 0:\n        return 0.0\n\n    G = torch.tensor(0.0, dtype=torch.float64)\n    # Reverse accumulation: G = r_t + gamma * G\n    for rv in torch.flip(r, dims=[0]):\n        G = rv + gamma * G\n\n    return float(G.item())\n\n\ndef solution():\n    # Example usage matching the prompt\n    rewards = [1, 2, 3, 4]\n    gamma = 0.9\n    return discounted_return(rewards, gamma)\n\nif __name__ == \"__main__\":\n    result = solution()\n    print(result)  # Expected: 8.146\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)",
  "platform": "deepml"
};
