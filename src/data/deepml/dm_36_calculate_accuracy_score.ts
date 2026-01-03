import { Problem } from '../../types';

export const DM_36_CALCULATE_ACCURACY_SCORE: Problem = {
  "id": "dm_36_calculate_accuracy_score",
  "title": "Calculate Accuracy Score",
  "difficulty": "Easy",
  "tags": [
    "Probability",
    "Matrix Operations"
  ],
  "descriptionMarkdown": "Write a Python function to calculate the accuracy score of a model's predictions. The function should take in two 1D arrays: y_true, which contains the true labels, and y_pred, which contains the predicted labels. It should return the accuracy score as a float.\n\nExample:\n\nInput:\n\ny_true = [1, 0, 1, 1, 0, 1]\ny_pred = [1, 0, 0, 1, 0, 1]\n\nOutput:\n\n0.8333333333333334\n\nReasoning:\nThe function compares the true labels with the predicted labels and calculates the ratio of correct predictions to the total number of predictions. In this example, there are 5 correct predictions out of 6, resulting in an accuracy score of 0.8333333333333334.",
  "solutionExplanation": "Accuracy measures the fraction of predictions that match the true labels. For arrays y_true and y_pred of equal length, we can compute a boolean mask y_true == y_pred and then take its mean. The mean of this boolean mask (after casting to float) gives the ratio of correct predictions to total predictions.\n\nIn a PyTorch implementation, we first ensure both inputs are tensors, validate they have the same shape and are non-empty, and then perform the vectorized equality operation. Computing the mean of the resulting boolean tensor (converted to float) yields the accuracy as a scalar float. This approach is fully vectorized and efficient.",
  "solutionCode": "import torch\nfrom typing import Union\n\n\ndef accuracy_score(y_true: Union[torch.Tensor, list], y_pred: Union[torch.Tensor, list]) -> float:\n    \"\"\"\n    Compute classification accuracy as the ratio of correct predictions to total samples.\n\n    Parameters:\n        y_true: 1D ground-truth labels (torch.Tensor or list/array-like)\n        y_pred: 1D predicted labels (torch.Tensor or list/array-like)\n\n    Returns:\n        float: accuracy in [0, 1]\n    \"\"\"\n    # Convert inputs to torch tensors if needed\n    if not isinstance(y_true, torch.Tensor):\n        y_true = torch.as_tensor(y_true)\n    if not isinstance(y_pred, torch.Tensor):\n        y_pred = torch.as_tensor(y_pred)\n\n    # Ensure same shape and non-empty\n    if y_true.numel() == 0:\n        raise ValueError(\"y_true must not be empty.\")\n    if y_true.shape != y_pred.shape:\n        raise ValueError(\"y_true and y_pred must have the same shape.\")\n\n    # Flatten to 1D to be robust to shape variations\n    y_true = y_true.reshape(-1)\n    y_pred = y_pred.reshape(-1)\n\n    # Vectorized equality and mean for accuracy\n    correct_mask = (y_true == y_pred)\n    accuracy = correct_mask.float().mean().item()\n    return float(accuracy)\n\n\ndef solution():\n    # Example usage matching the problem statement\n    y_true = torch.tensor([1, 0, 1, 1, 0, 1])\n    y_pred = torch.tensor([1, 0, 0, 1, 0, 1])\n    acc = accuracy_score(y_true, y_pred)\n    print(acc)  # Expected: 0.8333333333333334\n    return acc\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)",
  "platform": "deepml"
};
