import { Problem } from '../../types';

export const BINARY_TREE_LEVEL_ORDER_TRAVERSAL: Problem = {
  "id": "102_binary_tree_level_order_traversal",
  "title": "Binary Tree Level Order Traversal",
  "difficulty": "Medium",
  "tags": [
    "Tree",
    "BFS",
    "Binary Tree"
  ],
  "descriptionMarkdown": "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).\n\nExample 1:\nInput: root = [3,9,20,null,null,15,7]\nOutput: [[3],[9,20],[15,7]]\n\nExample 2:\nInput: root = [1]\nOutput: [[1]]\n\nExample 3:\nInput: root = []\nOutput: []\n\nConstraints:\n- The number of nodes in the tree is in the range [0, 2000].\n- -1000 <= Node.val <= 1000.",
  "solutionExplanation": "A natural way to collect nodes level by level is to use Breadth-First Search (BFS) with a queue. Start by enqueuing the root. For each iteration, process exactly the number of nodes currently in the queue (this is the size of the current level). While processing a level, pop nodes from the queue, record their values, and enqueue their non-null children. Append the list of values for that level to the result.\n\nThis approach guarantees that nodes are visited from left to right within each level, and levels are processed in order from top to bottom. The algorithm visits each node exactly once and uses a queue whose maximum size is bounded by the maximum width of the tree.",
  "solutionCode": "from typing import List, Optional\nfrom collections import deque\n\n# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass Solution:\n    def levelOrder(self, root: Optional['TreeNode']) -> List[List[int]]:\n        if not root:\n            return []\n        result: List[List[int]] = []\n        queue = deque([root])\n        \n        while queue:\n            level_size = len(queue)\n            level: List[int] = []\n            for _ in range(level_size):\n                node = queue.popleft()\n                level.append(node.val)\n                if node.left:\n                    queue.append(node.left)\n                if node.right:\n                    queue.append(node.right)\n            result.append(level)\n        \n        return result\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(N)"
};
