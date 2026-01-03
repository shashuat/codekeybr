import { Problem } from '../../types';

export const MAXIMUM_DEPTH_OF_BINARY_TREE: Problem = {
  "id": "104_maximum_depth_of_binary_tree",
  "title": "Maximum Depth of Binary Tree",
  "difficulty": "Easy",
  "tags": [
    "Tree",
    "Binary Tree",
    "DFS",
    "BFS"
  ],
  "descriptionMarkdown": "Given the root of a binary tree, return its maximum depth.\n\nA binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.\n\nExample 1:\n\nInput: root = [3,9,20,null,null,15,7]\nOutput: 3\n\nExample 2:\n\nInput: root = [1,null,2]\nOutput: 2\n\nConstraints:\n- The number of nodes in the tree is in the range [0, 10^4].\n- -100 <= Node.val <= 100",
  "solutionExplanation": "We can compute the maximum depth via depth-first search (DFS). The key idea is to traverse the tree and keep track of the current depth, updating the maximum seen so far. Using an explicit stack avoids Python's recursion depth limits while preserving the DFS behavior.\n\nStart by pushing the root with depth 1. Pop a node, update the answer with its depth, and push its non-null children with depth + 1. When the stack becomes empty, the recorded maximum is the tree's maximum depth. A breadth-first search (by levels) also works and yields the same result, but the iterative DFS with a stack provides O(H) auxiliary space where H is the tree height.",
  "solutionCode": "from typing import Optional\n\n# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass Solution:\n    def maxDepth(self, root: Optional['TreeNode']) -> int:\n        if not root:\n            return 0\n        max_depth = 0\n        stack = [(root, 1)]  # (node, depth)\n        while stack:\n            node, depth = stack.pop()\n            if node:\n                if depth > max_depth:\n                    max_depth = depth\n                if node.left:\n                    stack.append((node.left, depth + 1))\n                if node.right:\n                    stack.append((node.right, depth + 1))\n        return max_depth",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(H)"
};
