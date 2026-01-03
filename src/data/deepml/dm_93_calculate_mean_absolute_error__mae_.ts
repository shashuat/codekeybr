import { Problem } from '../../types';

export const DM_93_CALCULATE_MEAN_ABSOLUTE_ERROR__MAE_: Problem = {
  "id": "dm_93_calculate_mean_absolute_error_mae",
  "title": "Calculate Mean Absolute Error (MAE)",
  "difficulty": "Easy",
  "tags": [
    "Loss Functions"
  ],
  "descriptionMarkdown": "Implement a function to calculate the Mean Absolute Error (MAE) between two arrays of actual and predicted values. The MAE measures the average magnitude of errors in a set of predictions without considering their direction.\n\nGiven two arrays of equal length, y_true and y_pred, compute the mean of the absolute differences between corresponding elements and return the result rounded to three decimal places.\n\nExample:\n- Input: y_true = [3, -0.5, 2, 7], y_pred = [2.5, 0.0, 2, 8]\n- Output: 0.500\n\nReasoning: MAE = mean(|y_true - y_pred|) = (|3-2.5| + |-0.5-0.0| + |2-2| + |7-8|) / 4 = (0.5 + 0.5 + 0 + 1) / 4 = 0.5.",
  "solutionExplanation": "The Mean Absolute Error (MAE) is defined as MAE = (1/n) * sum_i |y_i - y\u0302_i|, where y_i are the true values and y\u0302_i are the predicted values. It penalizes all deviations linearly and treats positive and negative errors equally by taking the absolute value.\n\nTo compute this with PyTorch, we convert the inputs to float tensors, ensure they have the same number of elements, compute the elementwise absolute difference, and then take the mean. Finally, we return the result rounded to three decimal places as required by the prompt. Using vectorized tensor operations ensures the implementation is efficient and concise.",
  "solutionCode": "import torch\nfrom typing import Any\n\ndef mae(y_true: Any, y_pred: Any, decimals: int = 3) -> float:\n    \"\"\"\n    Calculate Mean Absolute Error (MAE) between two arrays/tensors.\n\n    Parameters:\n        y_true: Sequence, NumPy array, or torch.Tensor of true values\n        y_pred: Sequence, NumPy array, or torch.Tensor of predicted values\n        decimals: Number of decimal places to round the result (default: 3)\n\n    Returns:\n        float: Mean Absolute Error rounded to the specified decimals.\n    \"\"\"\n    # Convert inputs to float tensors\n    yt = torch.as_tensor(y_true, dtype=torch.float32)\n    yp = torch.as_tensor(y_pred, dtype=torch.float32)\n\n    # Flatten to ensure element-wise comparison regardless of input shape\n    yt = yt.view(-1)\n    yp = yp.view(-1)\n\n    if yt.numel() != yp.numel():\n        raise ValueError(\"y_true and y_pred must contain the same number of elements.\")\n\n    # Compute MAE: mean of absolute differences\n    mae_value = torch.mean(torch.abs(yp - yt)).item()\n\n    # Round to the requested number of decimals\n    return round(mae_value, decimals)\n\n\ndef solution():\n    # Example usage based on the problem statement\n    y_true = [3, -0.5, 2, 7]\n    y_pred = [2.5, 0.0, 2, 8]\n    result = mae(y_true, y_pred)\n    print(result)  # Expected: 0.5 (or 0.500 when formatted to 3 decimals)\n    return result\n\nif __name__ == \"__main__\":\n    solution()\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)",
  "platform": "deepml"
};
