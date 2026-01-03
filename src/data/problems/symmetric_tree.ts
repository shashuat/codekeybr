import { Problem } from '../../types';

export const SYMMETRIC_TREE: Problem = {
  "id": "101_symmetric_tree",
  "title": "Symmetric Tree",
  "difficulty": "Easy",
  "tags": [
    "Tree",
    "Binary Tree",
    "DFS",
    "BFS"
  ],
  "descriptionMarkdown": "Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).\n\nExample 1:\nInput: root = [1,2,2,3,4,4,3]\nOutput: true\n\nExample 2:\nInput: root = [1,2,2,null,3,null,3]\nOutput: false\n\nConstraints:\n- The number of nodes in the tree is in the range [1, 1000].\n- -100 <= Node.val <= 100\n\nFollow-up: Could you solve it both recursively and iteratively?",
  "solutionExplanation": "A binary tree is symmetric if its left and right subtrees are mirror images. Two subtrees are mirrors if their roots have equal values and the left child of one matches the right child of the other (and vice versa) recursively. This leads to a simple recursive check: mirror(l, r) = (l.val == r.val) and mirror(l.left, r.right) and mirror(l.right, r.left).\n\nIteratively, we can avoid recursion depth by using a queue (or stack) of node pairs. Initialize with (root.left, root.right). Repeatedly pop a pair: if both are null, continue; if exactly one is null or their values differ, return false. Otherwise, push their outer pair (l.left, r.right) and inner pair (l.right, r.left). If the queue empties without conflict, the tree is symmetric.",
  "solutionCode": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\nfrom collections import deque\n\nclass Solution:\n    def isSymmetric(self, root: 'Optional[TreeNode]') -> bool:\n        if not root:\n            return True\n        # Iterative BFS over node pairs\n        q = deque([(root.left, root.right)])\n        while q:\n            a, b = q.popleft()\n            if not a and not b:\n                continue\n            if not a or not b or a.val != b.val:\n                return False\n            q.append((a.left, b.right))   # outer\n            q.append((a.right, b.left))   # inner\n        return True\n\n        # Recursive alternative:\n        # def mirror(x, y):\n        #     if not x and not y:\n        #         return True\n        #     if not x or not y or x.val != y.val:\n        #         return False\n        #     return mirror(x.left, y.right) and mirror(x.right, y.left)\n        # return mirror(root.left, root.right)\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(H) worst-case O(N)"
};
