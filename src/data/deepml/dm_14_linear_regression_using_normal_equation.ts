import { Problem } from '../../types';

export const DM_14_LINEAR_REGRESSION_USING_NORMAL_EQUATION: Problem = {
  "id": "dm_14_linear_regression_using_normal_equation",
  "title": "Linear Regression Using Normal Equation",
  "difficulty": "Easy",
  "tags": [
    "Linear Algebra",
    "Matrix Operations",
    "Optimization"
  ],
  "descriptionMarkdown": "Write a Python function that performs linear regression using the normal equation. The function should take a matrix X (features) and a vector y (target) as input, and return the coefficients of the linear regression model. Round the coefficients to four decimal places; note that -0.0 is a valid result when rounding very small negative numbers.\n\nExample:\n- Input: X = [[1, 1], [1, 2], [1, 3]], y = [1, 2, 3]\n- Output: [0.0, 1.0]\n\nReasoning: The linear model is y = 0.0 + 1.0*x, perfectly fitting the input data.",
  "solutionExplanation": "The normal equation provides a closed-form solution to linear regression by minimizing the mean squared error without iterative optimization. Given a design matrix X (with an intercept column if required) and target vector y, the optimal parameters are given by \u03b8 = (X\u1d40X)\u207b\u00b9X\u1d40y. In practice, directly inverting X\u1d40X can be numerically unstable or impossible if X\u1d40X is singular.\n\nTo ensure numerical stability, we use the Moore\u2013Penrose pseudoinverse: \u03b8 = pinv(X) \u00b7 y. This handles rank-deficient or ill-conditioned matrices gracefully. After computing \u03b8 with PyTorch's linear algebra routines, we round each coefficient to four decimal places as required, returning them as a Python list of floats. The function assumes the intercept column is already present in X if desired.",
  "solutionCode": "import torch\nfrom typing import List\n\n\ndef linear_regression_normal_equation(X: List[List[float]], y: List[float]) -> List[float]:\n    \"\"\"\n    Compute linear regression coefficients using the normal equation via pseudoinverse.\n\n    Args:\n        X: 2D list (n x d) of input features. Include an intercept column if needed.\n        y: 1D list (n,) of target values.\n\n    Returns:\n        List[float]: Coefficients (length d), rounded to 4 decimal places.\n    \"\"\"\n    # Convert inputs to double precision tensors for numerical stability\n    X_t = torch.tensor(X, dtype=torch.float64)\n    y_t = torch.tensor(y, dtype=torch.float64).reshape(-1, 1)\n\n    # Basic shape validation\n    if X_t.ndim != 2:\n        raise ValueError(\"X must be a 2D list or array-like.\")\n    if y_t.ndim != 2 or y_t.shape[1] != 1:\n        raise ValueError(\"y must be a 1D list or array-like of length n.\")\n    if X_t.shape[0] != y_t.shape[0]:\n        raise ValueError(\"Number of rows in X must match length of y.\")\n\n    # Compute coefficients using the Moore-Penrose pseudoinverse for stability\n    # theta = pinv(X) @ y\n    theta = torch.linalg.pinv(X_t) @ y_t  # (d x n) @ (n x 1) -> (d x 1)\n\n    # Round to 4 decimal places; -0.0 is preserved by IEEE-754 semantics\n    theta = torch.round(theta * 10000.0) / 10000.0\n\n    # Return as a Python list of floats\n    return [float(v) for v in theta.view(-1).tolist()]\n\n\nif __name__ == \"__main__\":\n    # Example usage\n    X = [[1, 1], [1, 2], [1, 3]]\n    y = [1, 2, 3]\n    coeffs = linear_regression_normal_equation(X, y)\n    print(coeffs)  # Expected: [0.0, 1.0]\n",
  "timeComplexity": "O(n d^2 + d^3)",
  "spaceComplexity": "O(nd + d^2)",
  "platform": "deepml"
};
