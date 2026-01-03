import { Problem } from '../../types';

export const DM_64_IMPLEMENT_GINI_IMPURITY_CALCULATION_FOR_A_SET_OF_CLASSES: Problem = {
  "id": "dm_64_implement_gini_impurity_calculation_for_a_set_of_classes",
  "title": "Implement Gini Impurity Calculation for a Set of Classes",
  "difficulty": "Easy",
  "tags": [
    "Probability",
    "Loss Functions"
  ],
  "descriptionMarkdown": "Task: Implement Gini Impurity Calculation\n\nYour task is to implement a function that calculates the Gini Impurity for a set of classes. Gini impurity is commonly used in decision tree algorithms to measure the impurity or disorder within a node.\n\nExample:\n- Input: y = [0, 1, 1, 1, 0]\n- Output: 0.48\n\nReasoning: The Gini Impurity is calculated as 1 - (p_0^2 + p_1^2), where p_0 and p_1 are the probabilities of each class. In this case, p_0 = 2/5 and p_1 = 3/5, resulting in a Gini Impurity of 0.48.\n\nReturn the Gini Impurity rounded to three decimal places.",
  "solutionExplanation": "Gini impurity measures how often a randomly chosen element from the set would be incorrectly labeled if it were randomly labeled according to the distribution of labels in the subset. For a set of labels y with class probabilities p_i, the Gini impurity is defined as Gini(y) = 1 - sum_i p_i^2. It equals zero when all samples belong to one class and increases as the class distribution becomes more mixed.\n\nTo compute this efficiently, we count occurrences of each class, convert counts to probabilities by dividing by the total number of samples, and then compute 1 minus the sum of squared probabilities. Using PyTorch, we can leverage torch.bincount to obtain class counts in O(N) time. The function handles Python lists or 1D tensors, checks for empty inputs (returning 0.0), and returns the result rounded to three decimal places.",
  "solutionCode": "import torch\n\ndef gini_impurity(y):\n    \"\"\"\n    Calculate the Gini Impurity for a list or tensor of class labels.\n    Returns the value rounded to three decimal places.\n\n    Args:\n        y (Union[List[int], torch.Tensor]): 1D list/array of non-negative integer class labels.\n\n    Returns:\n        float: Gini impurity rounded to three decimal places.\n    \"\"\"\n    # Convert input to a 1D tensor of integer labels\n    if not isinstance(y, torch.Tensor):\n        y = torch.tensor(y, dtype=torch.long)\n    else:\n        y = y.to(dtype=torch.long).flatten()\n\n    n = y.numel()\n    if n == 0:\n        # By convention, impurity of an empty set can be treated as 0.0\n        return 0.0\n\n    if (y < 0).any():\n        raise ValueError(\"Class labels must be non-negative integers for Gini impurity.\")\n\n    # Count occurrences per class: size equals max(label)+1\n    counts = torch.bincount(y)\n\n    # Convert counts to probabilities\n    probs = counts.float() / float(n)\n\n    # Gini impurity: 1 - sum(p_i^2)\n    gini = 1.0 - torch.sum(probs * probs).item()\n\n    return round(gini, 3)\n\n\ndef solution():\n    # Example usage\n    y = [0, 1, 1, 1, 0]\n    result = gini_impurity(y)\n    print(result)  # Expected: 0.48\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(K)",
  "platform": "deepml"
};
