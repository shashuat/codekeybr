import { Problem } from '../../types';

export const DM_82_GRAYSCALE_IMAGE_CONTRAST_CALCULATOR: Problem = {
  "id": "dm_82_grayscale_image_contrast_calculator",
  "title": "Grayscale Image Contrast Calculator",
  "difficulty": "Easy",
  "tags": [
    "Matrix Operations",
    "Linear Algebra"
  ],
  "descriptionMarkdown": "Write a Python function to calculate the contrast of a grayscale image using the difference between the maximum and minimum pixel values.\n\nExample:\n\nInput:\n\n```python\ning = np.array([[0, 50], [200, 255]])\n```\n\nOutput:\n\nReasoning:\nThe function calculates contrast by finding the difference between the maximum (255) and minimum (0) pixel values in the image, resulting in a contrast of 255.",
  "solutionExplanation": "The contrast of a grayscale image can be defined as the range of its pixel intensities, computed as the difference between the maximum and minimum pixel values. This is a simple yet effective measure of contrast: images with a wider range have higher contrast, while those with a narrow range have lower contrast.\n\nIn PyTorch, we can compute this efficiently using tensor operations. We first convert the input to a tensor, cast to a floating-point type to avoid issues with unsigned integer arithmetic, then compute the global maximum and minimum using torch.max and torch.min. The difference gives the contrast, which we return as a Python int for convenience.",
  "solutionCode": "import torch\nfrom typing import Any\n\ndef calculate_contrast(img: Any) -> int:\n    \"\"\"\n    Calculate the contrast of a grayscale image as (max_pixel - min_pixel).\n\n    Args:\n        img: 2D array-like or torch.Tensor representing a grayscale image\n             with pixel values typically in [0, 255]. Can be list, numpy array,\n             or torch.Tensor.\n\n    Returns:\n        int: Contrast value (non-negative integer).\n    \"\"\"\n    # Convert input to a PyTorch tensor without copying when possible\n    t = torch.as_tensor(img)\n\n    if t.ndim < 2:\n        raise ValueError(\"Input must be at least a 2D grayscale image.\")\n\n    # Use float to avoid unsigned integer wrap-around and ensure correct subtraction\n    t_float = t.to(torch.float32)\n\n    # Compute global max and min over all pixels\n    max_val = torch.max(t_float)\n    min_val = torch.min(t_float)\n\n    contrast = max_val - min_val\n\n    # Return as Python int\n    return int(contrast.item())\n\n\ndef solution() -> int:\n    \"\"\"Runs the sample test and returns the computed contrast.\"\"\"\n    img = torch.tensor([[0, 50], [200, 255]], dtype=torch.uint8)\n    # The function accepts any dtype; it will cast internally to float32.\n    result = calculate_contrast(img)\n    # Expected: 255\n    return result\n\nif __name__ == \"__main__\":\n    print(\"Contrast:\", solution())\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)",
  "platform": "deepml"
};
