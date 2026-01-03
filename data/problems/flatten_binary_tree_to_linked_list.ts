import { Problem } from '../../types';

export const FLATTEN_BINARY_TREE_TO_LINKED_LIST: Problem = {
  "id": "114_flatten_binary_tree_to_linked_list",
  "title": "Flatten Binary Tree to Linked List",
  "difficulty": "Medium",
  "tags": [
    "Tree",
    "DFS",
    "Linked List",
    "Stack"
  ],
  "descriptionMarkdown": "Given the root of a binary tree, flatten the tree into a \"linked list\":\n\n- The list should reuse the same TreeNode class, where the right pointer points to the next node and the left pointer is always null.\n- The list order must match a pre-order traversal (root, left, right).\n\nExample 1:\nInput: root = [1,2,5,3,4,null,6]\nOutput: [1,null,2,null,3,null,4,null,5,null,6]\n\nExample 2:\nInput: root = []\nOutput: []\n\nExample 3:\nInput: root = [0]\nOutput: [0]\n\nConstraints:\n- Number of nodes: [0, 2000]\n- -100 <= Node.val <= 100\n\nFollow-up: Can you flatten the tree in-place with O(1) extra space?",
  "solutionExplanation": "We can flatten the tree in-place using a Morris-style preorder threading. Iterate with a pointer cur. For each node, if it has a left child, find the rightmost node (predecessor) in its left subtree. Splice the original right subtree to predecessor.right, then move the entire left subtree to cur.right and set cur.left to null. Finally, advance cur to cur.right. This rearranges pointers so that each node\u2019s left subtree appears immediately after the node (as in preorder), followed by the original right subtree.\n\nThis approach performs a constant amount of work per node plus the traversal to locate predecessors across the whole tree, which totals linear time. It uses only O(1) extra space because it modifies pointers in-place without recursion or an explicit stack. An alternative is a reverse-preorder recursion keeping a prev pointer, which is simpler but uses O(h) stack space.",
  "solutionCode": "from typing import Optional\n\n# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass Solution:\n    def flatten(self, root: Optional[TreeNode]) -> None:\n        \"\"\"\n        Flattens the binary tree rooted at 'root' into a right-skewed linked list\n        following preorder traversal, in-place with O(1) extra space.\n        \"\"\"\n        cur = root\n        while cur:\n            if cur.left:\n                # Find the rightmost node of the left subtree (predecessor)\n                pred = cur.left\n                while pred.right:\n                    pred = pred.right\n                # Splice: predecessor's right becomes current's right\n                pred.right = cur.right\n                # Move left subtree to right and nullify left\n                cur.right = cur.left\n                cur.left = None\n            # Advance to next node in the flattened list\n            cur = cur.right\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)"
};
