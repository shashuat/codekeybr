import { Problem } from '../../types';

export const DM_118_COMPUTE_THE_CROSS_PRODUCT_OF_TWO_3D_VECTORS: Problem = {
  "id": "dm_118_compute_the_cross_product_of_two_3d_vectors",
  "title": "Compute the Cross Product of Two 3D Vectors",
  "difficulty": "Easy",
  "tags": [
    "Linear Algebra",
    "Matrix Operations"
  ],
  "descriptionMarkdown": "Implement a function to compute the cross product of two 3-dimensional vectors. The cross product of two vectors results in a third vector that is perpendicular to both and follows the right-hand rule. This concept is fundamental in physics, engineering, and 3D graphics.\n\nExample:\n\nInput:\n\ncross_product([1, 0, 0], [0, 1, 0])\n\nOutput:\n\n[0, 0, 1]\n\nReasoning:\nThe cross product of two orthogonal unit vectors [1, 0, 0] and [0, 1, 0] is [0, 0, 1], pointing in the positive z-direction as per the right-hand rule.",
  "solutionExplanation": "The cross product of two 3D vectors a = (a1, a2, a3) and b = (b1, b2, b3) is defined as a \u00d7 b = (a2 b3 \u2212 a3 b2, a3 b1 \u2212 a1 b3, a1 b2 \u2212 a2 b1). The resulting vector is orthogonal to both inputs and its direction follows the right-hand rule. This operation is ubiquitous in 3D geometry for computing normals, torques, and rotational effects.\n\nIn PyTorch, we can compute this efficiently using torch.cross along the last dimension for inputs of shape (..., 3). The implementation below accepts Python lists or tensors, validates shapes, promotes dtypes appropriately (casting integers to floating tensors as needed), and returns a tensor on the same device. This keeps the function robust and ready for use in production or within larger PyTorch pipelines.",
  "solutionCode": "import torch\n\ndef cross_product(a, b):\n    \"\"\"\n    Compute the cross product of two 3D vectors (or batches of 3D vectors) using PyTorch.\n\n    Args:\n        a (array-like or torch.Tensor): Shape (..., 3)\n        b (array-like or torch.Tensor): Shape (..., 3)\n\n    Returns:\n        torch.Tensor: Cross product with shape (..., 3), on the same device as the input.\n    \"\"\"\n    at = torch.as_tensor(a)\n    bt = torch.as_tensor(b)\n\n    if at.shape != bt.shape:\n        raise ValueError(f\"Shape mismatch: a.shape={at.shape}, b.shape={bt.shape}. Both must be the same shape (..., 3).\")\n    if at.ndim == 0 or at.shape[-1] != 3:\n        raise ValueError(f\"Invalid input shape {at.shape}. Expected last dimension of size 3.\")\n\n    # Ensure both tensors are on the same device\n    bt = bt.to(device=at.device)\n\n    # Promote dtype: if any is floating, use result_type; otherwise use default float.\n    if at.is_floating_point or bt.is_floating_point:\n        dtype = torch.result_type(at, bt)\n    else:\n        dtype = torch.get_default_dtype()\n\n    at = at.to(dtype=dtype)\n    bt = bt.to(dtype=dtype)\n\n    # Compute cross product along the last dimension\n    return torch.cross(at, bt, dim=-1)\n\n\ndef solution():\n    # Example usage\n    a = [1, 0, 0]\n    b = [0, 1, 0]\n    result = cross_product(a, b)\n    # Expected: [0.0, 0.0, 1.0]\n    print(\"cross_product([1, 0, 0], [0, 1, 0]) ->\", result.tolist())\n    return result\n",
  "timeComplexity": "O(1)",
  "spaceComplexity": "O(1)",
  "platform": "deepml"
};
