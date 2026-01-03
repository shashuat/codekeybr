import { Problem } from '../../types';

export const DM_112_MIN_MAX_NORMALIZATION_OF_FEATURE_VALUES: Problem = {
  "id": "dm_112_min_max_normalization_of_feature_values",
  "title": "Min-Max Normalization of Feature Values",
  "difficulty": "Easy",
  "tags": [
    "Matrix Operations",
    "Linear Algebra"
  ],
  "descriptionMarkdown": "Implement a function that performs Min-Max Normalization on a list of numbers, scaling all values to the range [0, 1]. The minimum value in the list should become 0, the maximum should become 1, and all other values should be scaled proportionally between them.\n\nMin-Max normalization ensures that all features contribute equally to a model by transforming them to a common scale. If all values in the input are identical, return a list of zeros to avoid division by zero.\n\nExample:\n- Input: `min_max([1, 2, 3, 4, 5])`\n- Output: `[0.0, 0.25, 0.5, 0.75, 1.0]`\n\nReasoning: The minimum value (1) becomes 0.0, the maximum value (5) becomes 1.0, and the values in between are scaled proportionally. For instance, 3 is exactly halfway between 1 and 5, so it becomes 0.5.",
  "solutionExplanation": "Min-Max normalization linearly rescales each value x in a vector to the interval [0, 1] using the formula: x' = (x - min) / (max - min). This preserves the relative distances between values while ensuring the smallest element maps to 0 and the largest maps to 1.\n\nA special case occurs when all input values are identical, leading to max == min and a zero denominator. In that case, the normalized output should be a vector of zeros (since all values are effectively the same), which also avoids division by zero. Using PyTorch, we convert the input list to a float tensor, compute min and max efficiently, handle the constant-vector case, and then apply the vectorized formula. The function returns a Python list for compatibility with the required interface.",
  "solutionCode": "import torch\nfrom typing import List\n\n\ndef min_max(x: List[float]) -> List[float]:\n    \"\"\"\n    Perform Min-Max normalization to scale values to [0, 1].\n\n    Args:\n        x: A list of numerical values.\n\n    Returns:\n        A new list with values normalized to [0, 1]. If all values are identical,\n        returns a list of zeros of the same length.\n    \"\"\"\n    # Handle empty input gracefully\n    if len(x) == 0:\n        return []\n\n    # Convert to a PyTorch tensor for efficient vectorized operations\n    t = torch.tensor(x, dtype=torch.float32)\n\n    # Compute min and max\n    t_min = torch.min(t)\n    t_max = torch.max(t)\n    t_range = t_max - t_min\n\n    # If all values are the same, avoid division by zero: return zeros\n    if torch.isclose(t_range, torch.tensor(0.0, dtype=t.dtype)):\n        return [0.0] * t.numel()\n\n    # Apply min-max normalization: (x - min) / (max - min)\n    normalized = (t - t_min) / t_range\n\n    # Return as a Python list of floats\n    return normalized.tolist()\n\n\ndef solution():\n    # Example usage\n    example = [1, 2, 3, 4, 5]\n    print(min_max(example))  # Expected: [0.0, 0.25, 0.5, 0.75, 1.0]\n\n    # Identical values case\n    identical = [7, 7, 7]\n    print(min_max(identical))  # Expected: [0.0, 0.0, 0.0]\n\n    # Empty input case\n    empty = []\n    print(min_max(empty))  # Expected: []\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(N)",
  "platform": "deepml"
};
