import { Problem } from '../../types';

export const VALIDATE_BINARY_SEARCH_TREE: Problem = {
  "id": "98_validate_binary_search_tree",
  "title": "Validate Binary Search Tree",
  "difficulty": "Medium",
  "tags": [
    "Tree",
    "DFS",
    "Binary Search Tree"
  ],
  "descriptionMarkdown": "Given the root of a binary tree, determine if it is a valid binary search tree (BST).\n\nA valid BST satisfies:\n- The left subtree of a node contains only nodes with keys strictly less than the node's key.\n- The right subtree of a node contains only nodes with keys strictly greater than the node's key.\n- Both left and right subtrees are also BSTs.\n\nExample 1:\nInput: root = [2,1,3]\nOutput: true\n\nExample 2:\nInput: root = [5,1,4,null,null,3,6]\nOutput: false\nExplanation: The root node's value is 5 but its right child's value is 4.\n\nConstraints:\n- The number of nodes is in the range [1, 10^4].\n- -2^31 <= Node.val <= 2^31 - 1.",
  "solutionExplanation": "Use depth-first search with value bounds. For each node, maintain the allowable value range (low, high): all nodes in the left subtree must be strictly less than the current node's value, and all nodes in the right subtree must be strictly greater. Initially, the root has no bounds. When recursing left, update the upper bound to the current node's value; when recursing right, update the lower bound. If any node violates its bounds, the tree is not a BST. This enforces the global BST property, not just parent-child checks.\n\nAn alternative is iterative inorder traversal. Inorder traversal of a valid BST yields a strictly increasing sequence. Track the previous visited value; if the current value is not greater than the previous, it's invalid. Both approaches run in linear time; the bounds method is straightforward and avoids storing the entire traversal.",
  "solutionCode": "from typing import Optional\n\n# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass Solution:\n    def isValidBST(self, root: Optional['TreeNode']) -> bool:\n        def dfs(node: Optional['TreeNode'], low: Optional[int], high: Optional[int]) -> bool:\n            if not node:\n                return True\n            # Check current value against bounds\n            if (low is not None and node.val <= low) or (high is not None and node.val >= high):\n                return False\n            # Left subtree: values < node.val; Right subtree: values > node.val\n            return dfs(node.left, low, node.val) and dfs(node.right, node.val, high)\n\n        return dfs(root, None, None)",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(H)"
};
