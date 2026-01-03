import { Problem } from '../../types';

export const DM_66_IMPLEMENT_ORTHOGONAL_PROJECTION_OF_A_VECTOR_ONTO_A_LINE: Problem = {
  "id": "dm_66_implement_orthogonal_projection_of_a_vector_onto_a_line",
  "title": "Implement Orthogonal Projection of a Vector onto a Line",
  "difficulty": "Easy",
  "tags": [
    "Linear Algebra",
    "Matrix Operations"
  ],
  "descriptionMarkdown": "Task: Compute the Orthogonal Projection of a Vector\n\nYour task is to implement a function that calculates the orthogonal projection of a vector v onto another vector L. This projection results in the vector on L that is closest to v.\n\nWrite a function orthogonal_projection(v, L) that takes in two lists, v (the vector to be projected) and L (the line vector), and returns the orthogonal projection of v onto L. The function should output a list representing the projection vector rounded to three decimal places.\n\nExample:\n- Input:\n  - v = [3, 4]\n  - L = [1, 0]\n  - print(orthogonal_projection(v, L))\n- Output:\n  - [3.0, 0.0]\n\nReasoning:\nThe orthogonal projection of vector [3, 4] onto the line defined by [1, 0] results in the projection vector [3, 0], which lies on the line [1, 0].",
  "solutionExplanation": "The orthogonal projection of a vector v onto a line spanned by a non-zero vector L is given by the formula proj_L(v) = ((v \u00b7 L) / (L \u00b7 L)) * L. This computes the scalar component of v in the direction of L and scales L by that amount to obtain the closest point to v on the line defined by L.\n\nIn implementation, we convert the input lists to 1D PyTorch tensors, compute the dot products using torch.dot, and then form the projection vector. We handle the edge case where L is the zero vector, which would make the direction undefined. Finally, we round the result to three decimal places and return it as a Python list.",
  "solutionCode": "import torch\n\ndef orthogonal_projection(v, L):\n    \"\"\"\n    Compute the orthogonal projection of vector v onto the line spanned by L.\n\n    Args:\n        v (list or sequence of floats): The vector to be projected.\n        L (list or sequence of floats): The line (direction) vector.\n\n    Returns:\n        list: The projection vector rounded to three decimal places.\n\n    Raises:\n        ValueError: If dimensions mismatch, inputs are not 1D, or L is the zero vector.\n    \"\"\"\n    # Convert inputs to 1D float tensors\n    v_t = torch.tensor(v, dtype=torch.float32)\n    L_t = torch.tensor(L, dtype=torch.float32)\n\n    if v_t.ndim != 1 or L_t.ndim != 1:\n        raise ValueError(\"Inputs v and L must be 1D sequences.\")\n    if v_t.numel() != L_t.numel():\n        raise ValueError(\"Vectors v and L must have the same dimension.\")\n\n    denom = torch.dot(L_t, L_t)\n    if denom.item() == 0.0:\n        raise ValueError(\"Line vector L must be non-zero.\")\n\n    scalar = torch.dot(v_t, L_t) / denom\n    proj = scalar * L_t\n\n    # Round to three decimals\n    proj = torch.round(proj * 1000.0) / 1000.0\n    return proj.tolist()\n\n\ndef solution():\n    # Example usage\n    v = [3, 4]\n    L = [1, 0]\n    proj = orthogonal_projection(v, L)\n    # Expected: [3.0, 0.0]\n    print(proj)\n    return proj\n\nif __name__ == \"__main__\":\n    solution()\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)",
  "platform": "deepml"
};
