import { Problem } from '../../types';

export const DM_113_IMPLEMENT_A_SIMPLE_RESIDUAL_BLOCK_WITH_SHORTCUT_CONNECTION: Problem = {
  "id": "dm_113_implement_a_simple_residual_block_with_shortcut_connection",
  "title": "Implement a Simple Residual Block with Shortcut Connection",
  "difficulty": "Easy",
  "tags": [
    "Neural Networks",
    "Activation Functions",
    "Matrix Operations",
    "Linear Algebra"
  ],
  "descriptionMarkdown": "Implement a function that creates a simple residual block using NumPy. The block should take a 1D input array, process it through two weight layers (using matrix multiplication), apply ReLU activations, and add the original input via a shortcut connection before a final ReLU activation.\n\nExample:\n\nInput:\n- x = np.array([1.0, 2.0])\n- w1 = np.array([[1.0, 0.0], [0.0, 1.0]])\n- w2 = np.array([[0.5, 0.0], [0.0, 0.5]])\n\nOutput:\n- [1.5, 3.0]\n\nReasoning:\nThe input x is [1.0, 2.0]. First, compute w1 @ x = [1.0, 2.0], apply ReLU to get [1.0, 2.0]. Then, compute w2 @ [1.0, 2.0] = [0.5, 1.0]. Add the shortcut x to get [0.5 + 1.0, 1.0 + 2.0] = [1.5, 3.0]. Final ReLU gives [1.5, 3.0].",
  "solutionExplanation": "A residual block augments a standard stack of layers with a shortcut (identity) connection that bypasses them and adds the input directly to the transformed output. This stabilizes training and helps gradients flow through deep networks. Concretely for a 1D input x and square weight matrices w1 and w2, we compute h1 = ReLU(w1 @ x), then z = w2 @ h1, add the shortcut z + x, and finally apply a ReLU: y = ReLU(z + x).\n\nThe ReLU nonlinearity ensures non-negative activations while the identity addition allows the block to learn residual functions (i.e., deviations from the identity mapping). If w1 and w2 are near zero, the block can default to approximately returning x after the final ReLU, making optimization easier. The operations are simple matrix-vector multiplications followed by elementwise additions and activations.",
  "solutionCode": "import torch\nimport torch.nn.functional as F\n\n\ndef residual_block(x: torch.Tensor, w1: torch.Tensor, w2: torch.Tensor) -> torch.Tensor:\n    \"\"\"\n    Compute a simple residual block on a 1D input tensor.\n\n    y = ReLU( w2 @ ReLU(w1 @ x) + x )\n\n    Args:\n        x: 1D float tensor of shape (d,)\n        w1: 2D float tensor of shape (d, d)\n        w2: 2D float tensor of shape (d, d)\n\n    Returns:\n        1D float tensor of shape (d,)\n    \"\"\"\n    if x.dim() != 1:\n        raise ValueError(f\"x must be 1D, got shape {tuple(x.shape)}\")\n    if w1.dim() != 2 or w2.dim() != 2:\n        raise ValueError(\"w1 and w2 must be 2D tensors\")\n    d = x.shape[0]\n    if w1.shape != (d, d) or w2.shape != (d, d):\n        raise ValueError(\n            f\"w1 and w2 must both be of shape (d, d) matching x; got w1={tuple(w1.shape)}, w2={tuple(w2.shape)}, x={(d,)}\"\n        )\n\n    # Ensure float dtype for math ops\n    x = x.to(dtype=torch.float32)\n    w1 = w1.to(dtype=torch.float32)\n    w2 = w2.to(dtype=torch.float32)\n\n    # Forward pass: two linear ops with ReLUs and a residual connection\n    h1 = F.relu(torch.matmul(w1, x))      # shape: (d,)\n    y = F.relu(torch.matmul(w2, h1) + x)  # residual addition and final ReLU\n    return y\n\n\ndef solution():\n    # Example usage matching the problem statement\n    x = torch.tensor([1.0, 2.0])\n    w1 = torch.tensor([[1.0, 0.0], [0.0, 1.0]])\n    w2 = torch.tensor([[0.5, 0.0], [0.0, 0.5]])\n\n    y = residual_block(x, w1, w2)\n    # Should print: [1.5, 3.0]\n    print(y.tolist())\n    return y\n",
  "timeComplexity": "O(d^2)",
  "spaceComplexity": "O(d)",
  "platform": "deepml"
};
