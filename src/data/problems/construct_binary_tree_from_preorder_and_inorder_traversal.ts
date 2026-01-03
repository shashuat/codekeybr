import { Problem } from '../../types';

export const CONSTRUCT_BINARY_TREE_FROM_PREORDER_AND_INORDER_TRAVERSAL: Problem = {
  "id": "105_construct_binary_tree_from_preorder_and_inorder_traversal",
  "title": "Construct Binary Tree from Preorder and Inorder Traversal",
  "difficulty": "Medium",
  "tags": [
    "Array",
    "Hash Table",
    "Divide and Conquer",
    "DFS",
    "Recursion",
    "Tree",
    "Binary Tree"
  ],
  "descriptionMarkdown": "Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.\n\nExample 1:\nInput: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]\nOutput: [3,9,20,null,null,15,7]\n\nExample 2:\nInput: preorder = [-1], inorder = [-1]\nOutput: [-1]\n\nConstraints:\n- 1 <= preorder.length <= 3000\n- inorder.length == preorder.length\n- -3000 <= preorder[i], inorder[i] <= 3000\n- preorder and inorder consist of unique values.\n- Each value of inorder also appears in preorder.\n- preorder is guaranteed to be the preorder traversal of the tree.\n- inorder is guaranteed to be the inorder traversal of the tree.",
  "solutionExplanation": "The first element in preorder is always the root. In inorder, elements to the left of the root belong to the left subtree and elements to the right belong to the right subtree. Using this property, we can recursively build the tree: pick the next root from preorder, split the inorder range into left/right parts around that root, and recurse.\n\nTo avoid O(N^2) behavior from repeatedly searching in inorder, precompute a hashmap from value to its index in inorder. Maintain a pointer over preorder indicating the next root to place. Each node is created exactly once, and each array index is processed in O(1) via the map, yielding an optimal O(N) solution.\n\nWe implement a helper that takes the current inorder bounds [L..R]. It constructs the root from preorder[pre_idx], finds its inorder position, recurses on [L..mid-1] for the left subtree and [mid+1..R] for the right subtree, and advances the preorder index.",
  "solutionCode": "from typing import List, Optional\nimport sys\n\n# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nsys.setrecursionlimit(1_000_000)\n\nclass Solution:\n    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional['TreeNode']:\n        if not preorder:\n            return None\n\n        index = {val: i for i, val in enumerate(inorder)}\n        pre_i = 0\n\n        def helper(l: int, r: int) -> Optional['TreeNode']:\n            nonlocal pre_i\n            if l > r:\n                return None\n            root_val = preorder[pre_i]\n            pre_i += 1\n            root = TreeNode(root_val)\n            mid = index[root_val]\n            root.left = helper(l, mid - 1)\n            root.right = helper(mid + 1, r)\n            return root\n\n        return helper(0, len(inorder) - 1)\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(N)"
};
