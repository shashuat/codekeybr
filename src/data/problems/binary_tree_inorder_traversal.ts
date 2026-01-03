import { Problem } from '../../types';

export const BINARY_TREE_INORDER_TRAVERSAL: Problem = {
  "id": "94_binary_tree_inorder_traversal",
  "title": "Binary Tree Inorder Traversal",
  "difficulty": "Easy",
  "tags": [
    "Tree",
    "DFS",
    "Stack"
  ],
  "descriptionMarkdown": "Given the root of a binary tree, return the inorder traversal of its nodes' values (left, node, right).\n\nExamples:\n- Example 1:\n  - Input: root = [1,null,2,3]\n  - Output: [1,3,2]\n- Example 2:\n  - Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]\n  - Output: [4,2,6,5,7,1,3,9,8]\n- Example 3:\n  - Input: root = []\n  - Output: []\n- Example 4:\n  - Input: root = [1]\n  - Output: [1]\n\nConstraints:\n- The number of nodes in the tree is in the range [0, 100].\n- -100 <= Node.val <= 100\n\nFollow-up: Recursive solution is trivial; can you do it iteratively?",
  "solutionExplanation": "Inorder traversal visits nodes in the order: left subtree, current node, right subtree. The recursive approach directly mirrors this definition and is straightforward but uses the call stack implicitly.\n\nTo do it iteratively, use an explicit stack. Starting from the root, repeatedly push nodes while moving left until you reach null. Then pop a node from the stack, record its value, and move to its right child; repeat until both the current pointer is null and the stack is empty. This simulates the recursion and satisfies the follow-up requirement.",
  "solutionCode": "from typing import List, Optional\n\n# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass Solution:\n    def inorderTraversal(self, root: Optional['TreeNode']) -> List[int]:\n        result: List[int] = []\n        stack: List['TreeNode'] = []\n        curr = root\n        while curr is not None or stack:\n            # Go as far left as possible\n            while curr is not None:\n                stack.append(curr)\n                curr = curr.left\n            # Visit node\n            curr = stack.pop()\n            result.append(curr.val)\n            # Traverse right subtree\n            curr = curr.right\n        return result",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(H) auxiliary, where H is the tree height; worst-case O(N)"
};
