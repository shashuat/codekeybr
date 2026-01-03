import { Problem } from '../../types';

export const DM_55_2D_TRANSLATION_MATRIX_IMPLEMENTATION: Problem = {
  "id": "dm_55_2d_translation_matrix_implementation",
  "title": "2D Translation Matrix Implementation",
  "difficulty": "Medium",
  "tags": [
    "Linear Algebra",
    "Matrix Operations"
  ],
  "descriptionMarkdown": "Task: Implement a 2D Translation Matrix\n\nImplement a function translate_object(points, tx, ty) that applies a 2D translation to a set of 2D points. A translation moves each point by tx in the x-direction and ty in the y-direction.\n\n- points: list of [x, y] coordinates\n- tx, ty: translation distances along x and y axes\n\nThe function should return a new list of translated points.\n\nExample:\n\n```python\npoints = [[0, 0], [1, 0], [0.5, 1]]\ntx, ty = 2, 3\nprint(translate_object(points, tx, ty))\n# [[2.0, 3.0], [3.0, 3.0], [2.5, 4.0]]\n```\n",
  "solutionExplanation": "A 2D translation can be represented using homogeneous coordinates with a 3x3 transformation matrix. For a translation by (tx, ty), the matrix is:\n\n[ [1, 0, tx],\n  [0, 1, ty],\n  [0, 0,  1] ]\n\nTo apply this matrix, we augment each 2D point [x, y] to homogeneous form [x, y, 1], multiply by the translation matrix, and then drop the homogeneous coordinate. This is mathematically equivalent to adding [tx, ty] to each point, but using the matrix form aligns with standard linear-algebraic transformations and composes cleanly with other affine operations.\n\nIn PyTorch, we convert the input list to a tensor, build the translation matrix, augment the points with a column of ones, perform a matrix multiplication, and finally convert the result back to a Python list of lists to match the expected output format.",
  "solutionCode": "import torch\n\ndef translate_object(points, tx, ty):\n    \"\"\"Translate a set of 2D points by (tx, ty) using a 2D translation matrix.\n\n    Args:\n        points (list[list[float]] or torch.Tensor): List/Tensor of shape (N, 2) with [x, y] points.\n        tx (float): Translation along the x-axis.\n        ty (float): Translation along the y-axis.\n\n    Returns:\n        list[list[float]]: Translated points as a list of [x, y].\n    \"\"\"\n    # Convert input to float32 tensor of shape (N, 2)\n    pts = torch.as_tensor(points, dtype=torch.float32)\n    if pts.numel() == 0:\n        return []\n    if pts.dim() != 2 or pts.size(1) != 2:\n        raise ValueError(\"points must have shape (N, 2)\")\n\n    # Build 3x3 homogeneous translation matrix\n    T = torch.tensor([\n        [1.0, 0.0, float(tx)],\n        [0.0, 1.0, float(ty)],\n        [0.0, 0.0, 1.0]\n    ], dtype=torch.float32)\n\n    # Convert points to homogeneous coordinates: (N, 3)\n    ones = torch.ones((pts.size(0), 1), dtype=pts.dtype)\n    pts_h = torch.cat([pts, ones], dim=1)\n\n    # Apply translation: (N, 3) = (N, 3) @ (3, 3)^T\n    transformed_h = pts_h @ T.t()\n\n    # Drop homogeneous coordinate and return as list of lists\n    transformed = transformed_h[:, :2]\n    return transformed.tolist()\n\n# Example usage\nif __name__ == \"__main__\":\n    points = [[0, 0], [1, 0], [0.5, 1]]\n    tx, ty = 2, 3\n    print(translate_object(points, tx, ty))  # Expected: [[2.0, 3.0], [3.0, 3.0], [2.5, 4.0]]\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)",
  "platform": "deepml"
};
