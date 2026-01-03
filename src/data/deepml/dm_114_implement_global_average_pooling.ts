import { Problem } from '../../types';

export const DM_114_IMPLEMENT_GLOBAL_AVERAGE_POOLING: Problem = {
  "id": "dm_114_implement_global_average_pooling",
  "title": "Implement Global Average Pooling",
  "difficulty": "Easy",
  "tags": [
    "Neural Networks",
    "CNNs",
    "Matrix Operations"
  ],
  "descriptionMarkdown": "Implement a function that performs Global Average Pooling on a 3D array representing feature maps from a convolutional layer. The input has shape (height, width, channels) and the function should return a 1D array of shape (channels,), where each element is the average of all values in the corresponding feature map.\n\nExample:\n\nInput:\n\n```\nx = [[[1, 2, 3],\n      [4, 5, 6]],\n     [[7, 8, 9],\n      [10, 11, 12]]]\n```\n\nOutput:\n\n```\n[5.5, 6.5, 7.5]\n```\n\nReasoning:\nFor each channel, compute the average of all elements. For channel 0: (1+4+7+10)/4 = 5.5, for channel 1: (2+5+8+11)/4 = 6.5, for channel 2: (3+6+9+12)/4 = 7.5.",
  "solutionExplanation": "Global Average Pooling (GAP) reduces each feature map to a single value by averaging across its spatial dimensions. Given an input of shape (H, W, C), we compute the mean over the height and width dimensions for each channel independently, resulting in an output of shape (C,). This operation preserves channel information while discarding spatial details, and is commonly used before fully-connected layers or for building parameter-free classification heads.\n\nIn PyTorch, we can implement this by taking the mean over dimensions 0 and 1 (height and width). Since torch.mean is defined for floating-point tensors, we cast the input to a floating type to avoid issues with integer tensors. The operation is efficient and uses vectorized reductions over the specified dimensions.",
  "solutionCode": "import torch\nimport torch.nn as nn\n\ndef global_avg_pool(x: torch.Tensor) -> torch.Tensor:\n    \"\"\"\n    Perform Global Average Pooling over a 3D tensor with shape (H, W, C).\n\n    Args:\n        x: torch.Tensor of shape (H, W, C)\n\n    Returns:\n        torch.Tensor of shape (C,) containing the per-channel averages.\n    \"\"\"\n    if x.dim() != 3:\n        raise ValueError(\"Input must be a 3D tensor of shape (H, W, C)\")\n    # Ensure floating dtype for mean; computation stays on the same device\n    return x.to(dtype=torch.float32).mean(dim=(0, 1))\n\n\ndef solution():\n    # Example usage\n    x = torch.tensor([\n        [[1, 2, 3], [4, 5, 6]],\n        [[7, 8, 9], [10, 11, 12]]\n    ])\n    out = global_avg_pool(x)\n    # Expected: tensor([5.5000, 6.5000, 7.5000])\n    print(out)\n    return global_avg_pool\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)",
  "platform": "deepml"
};
