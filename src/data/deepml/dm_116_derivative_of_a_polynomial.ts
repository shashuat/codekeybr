import { Problem } from '../../types';

export const DM_116_DERIVATIVE_OF_A_POLYNOMIAL: Problem = {
  "id": "dm_116_derivative_of_a_polynomial",
  "title": "Derivative of a Polynomial",
  "difficulty": "Easy",
  "tags": [
    "Optimization",
    "Backpropagation",
    "Gradient Descent"
  ],
  "descriptionMarkdown": "Implement a function that computes the derivative of a polynomial term of the form c \u00b7 x^n at a given point x, where c is a coefficient and n is the exponent. The function should return the value of the derivative, accounting for the coefficient in the power rule. This is useful for understanding how polynomials change at specific points in machine learning optimization problems.\n\nExample:\n- Input: `poly_term_derivative(2.0, 3.0, 2.0)`\n- Output: `12.0`\n\nReasoning: For the term 2 \u00b7 x^2, the derivative is 2 \u00b7 2 \u00b7 x^(2\u22121) = 4 \u00b7 x. At x = 3, this evaluates to 4 \u00b7 3 = 12.0.",
  "solutionExplanation": "For a monomial term c \u00b7 x^n, the derivative with respect to x is given by the power rule: d/dx [c \u00b7 x^n] = c \u00b7 n \u00b7 x^(n\u22121). To evaluate the derivative at a specific point x, we substitute the value of x into this expression. The special case when n = 0 corresponds to a constant term c, whose derivative is 0.\n\nWe implement this directly using PyTorch tensors and tensor operations to stay consistent with deep learning workflows. This avoids any reliance on Python-only math and leverages torch.pow for exponentiation. The function safely handles the n = 0 case and returns a Python float using `.item()` for convenience.",
  "solutionCode": "import torch\n\n\ndef poly_term_derivative(c: float, x: float, n: float) -> float:\n    \"\"\"\n    Compute the derivative of the polynomial term c * x^n evaluated at x.\n\n    Uses the power rule: d/dx [c * x^n] = c * n * x^(n-1)\n\n    Args:\n        c (float): Coefficient of the term.\n        x (float): Point at which to evaluate the derivative.\n        n (float): Exponent of the term (can be integer or real).\n\n    Returns:\n        float: The value of the derivative at x.\n    \"\"\"\n    # Convert inputs to torch tensors for consistent tensor operations\n    c_t = torch.tensor(c, dtype=torch.float64)\n    x_t = torch.tensor(x, dtype=torch.float64)\n    n_t = torch.tensor(n, dtype=torch.float64)\n\n    # If n == 0, derivative of c * x^0 = c is 0\n    if float(n) == 0.0:\n        return 0.0\n\n    # Apply power rule using PyTorch tensor operations\n    deriv = c_t * n_t * x_t.pow(n_t - 1.0)\n\n    # Return as Python float\n    return float(deriv.item())\n\n\ndef solution():\n    # Example usage based on the prompt\n    example_val = poly_term_derivative(2.0, 3.0, 2.0)\n    # Prints 12.0\n    print(example_val)\n    return example_val\n",
  "timeComplexity": "O(1)",
  "spaceComplexity": "O(1)",
  "platform": "deepml"
};
