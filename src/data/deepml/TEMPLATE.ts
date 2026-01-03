import { Problem } from '../../types';

/**
 * TEMPLATE: Copy this file to create a new DeepML problem manually
 * 
 * Instructions:
 * 1. Copy this file to data/deepml/your_problem_slug.ts
 * 2. Rename the export constant (e.g., YOUR_PROBLEM_NAME)
 * 3. Fill in all the fields below
 * 4. Import and add to DEEPML_PROBLEMS array in data/deepml.ts
 */

export const TEMPLATE_PROBLEM: Problem = {
  // Format: "dm_{problem_number}_{snake_case_title}"
  id: "dm_001_example_problem",
  
  // The problem title
  title: "Example ML Problem",
  
  // Must be one of: "Easy", "Medium", "Hard"
  difficulty: "Medium",
  
  // DeepML-specific categories:
  // "Linear Algebra", "Neural Networks", "Optimization", "Probability",
  // "Loss Functions", "Activation Functions", "Regularization",
  // "Backpropagation", "Gradient Descent", "Matrix Operations"
  tags: ["Linear Algebra", "Neural Networks"],
  
  // The problem description in markdown format
  descriptionMarkdown: `# Problem Title

Brief description of the ML/DL problem goes here.

You can use **bold** and *italic* text, as well as \`inline code\`.

## Problem Statement

Implement a function that performs [specific ML operation].

## Example

**Input:**
\`\`\`python
X = [[1, 2], [3, 4]]
y = [0, 1]
\`\`\`

**Output:**
\`\`\`python
[[0.5, 0.3], [0.2, 0.8]]
\`\`\`

## Explanation

Explain the mathematical operation and why this is the output.

## Requirements

- Use PyTorch for implementation
- Implement the solution using PyTorch tensors and operations
- Follow PyTorch best practices
`,

  // The solution explanation (appears before code)
  solutionExplanation: `**Approach:** Explain the ML/mathematical concept.

**Mathematical Formulation:**
- Formula 1: $y = wx + b$
- Formula 2: $\\sigma(x) = \\frac{1}{1 + e^{-x}}$

**Implementation Steps:**
1. Initialize parameters
2. Compute forward pass
3. Apply activation function
4. Return result`,

  // The actual code to type (use realistic indentation)
  solutionCode: `import torch
import torch.nn as nn

def solve(X, y):
    """
    Implement the ML algorithm using PyTorch
    """
    # Convert to tensors
    X = torch.tensor(X, dtype=torch.float32)
    y = torch.tensor(y, dtype=torch.float32)
    
    # Initialize weights
    w = torch.randn(X.shape[1], requires_grad=True)
    
    # Forward pass
    z = torch.matmul(X, w)
    
    # Activation
    output = torch.sigmoid(z)
    
    return output

# Example usage
X = [[1, 2], [3, 4]]
y = [0, 1]
result = solve(X, y)
print(result)`,

  timeComplexity: "O(N * M)",
  spaceComplexity: "O(N)",
  
  platform: "deepml",
};
