import { Problem } from '../../types';

export const DM_121_VECTOR_ELEMENT_WISE_SUM: Problem = {
  "id": "dm_121_vector_element_wise_sum",
  "title": "Vector Element-wise Sum",
  "difficulty": "Easy",
  "tags": [
    "Linear Algebra",
    "Matrix Operations"
  ],
  "descriptionMarkdown": "Write a Python function that computes the element-wise sum of two vectors. The function should return a new vector representing the resulting sum if the operation is valid, or -1 if the vectors have incompatible dimensions. Two vectors (lists) can be summed element-wise only if they are of the same length.\n\nExample:\n- Input: a = [1, 3], b = [4, 5]\n- Output: [5, 8]\n- Reasoning: Element-wise sum: [1+4, 3+5] = [5, 8].",
  "solutionExplanation": "Element-wise vector addition requires both input vectors to have the same length; otherwise, the operation is undefined. We first check that the two lists have equal length. If they differ, we return -1 as specified by the problem statement.\n\nWhen the lengths match, we leverage PyTorch tensors for a vectorized, efficient element-wise addition. We convert the Python lists to 1-D tensors, perform the addition in a single operation, and then convert the result back to a Python list. PyTorch handles broadcasting and dtype inference, ensuring correctness for integer and floating-point inputs.",
  "solutionCode": "import torch\nfrom typing import List, Union\n\nNumber = Union[int, float]\n\ndef vector_sum(a: List[Number], b: List[Number]) -> Union[List[Number], int]:\n    \"\"\"\n    Compute the element-wise sum of two vectors using PyTorch.\n\n    Args:\n        a: List of numbers (ints/floats) representing the first vector.\n        b: List of numbers (ints/floats) representing the second vector.\n\n    Returns:\n        A new list with the element-wise sum if lengths match, otherwise -1.\n\n    Raises:\n        TypeError: If inputs are not lists.\n        ValueError: If inputs are not 1-D lists.\n    \"\"\"\n    if not isinstance(a, list) or not isinstance(b, list):\n        raise TypeError(\"Inputs must be lists of numbers.\")\n\n    # Length check per problem spec\n    if len(a) != len(b):\n        return -1\n\n    # Convert to 1-D tensors; torch infers dtype (int64 for ints, float32 for floats)\n    ta = torch.tensor(a)\n    tb = torch.tensor(b)\n\n    if ta.dim() != 1 or tb.dim() != 1:\n        raise ValueError(\"Inputs must be 1-D lists representing vectors.\")\n\n    # Vectorized element-wise addition\n    tc = ta + tb\n\n    # Convert back to Python list to match the expected return type\n    return tc.tolist()\n\n# Example usage\nif __name__ == \"__main__\":\n    a = [1, 3]\n    b = [4, 5]\n    print(vector_sum(a, b))  # [5, 8]\n    print(vector_sum([1, 2, 3], [4, 5]))  # -1\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(N)",
  "platform": "deepml"
};
