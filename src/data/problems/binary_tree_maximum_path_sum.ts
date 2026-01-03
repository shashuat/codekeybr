import { Problem } from '../../types';

export const BINARY_TREE_MAXIMUM_PATH_SUM: Problem = {
  "id": "124_binary_tree_maximum_path_sum",
  "title": "Binary Tree Maximum Path Sum",
  "difficulty": "Hard",
  "tags": [
    "Tree",
    "DFS",
    "Dynamic Programming"
  ],
  "descriptionMarkdown": "A path in a binary tree is a sequence of nodes where each adjacent pair is connected by an edge. A node can appear in the sequence at most once, and the path does not need to pass through the root.\n\nThe path sum is the sum of the node values along the path.\n\nGiven the root of a binary tree, return the maximum path sum of any non-empty path.\n\nExamples:\n- Input: root = [1,2,3] \u2192 Output: 6. The optimal path is 2 -> 1 -> 3 with sum 2 + 1 + 3 = 6.\n- Input: root = [-10,9,20,null,null,15,7] \u2192 Output: 42. The optimal path is 15 -> 20 -> 7 with sum 15 + 20 + 7 = 42.\n\nConstraints:\n- The number of nodes is in [1, 3 * 10^4].\n- -1000 <= Node.val <= 1000.",
  "solutionExplanation": "Use a post-order DFS that computes, for each node, the maximum \"gain\" it can contribute to a path that continues upward to its parent. The gain from a child is max(0, child's best downward path sum) so that negative paths are dropped. For a node, the best path that passes through it (as a peak) is node.val + leftGain + rightGain; we use this to update a global maximum.\n\nWhen returning to the parent, we can only extend one side, so we return node.val + max(leftGain, rightGain). This ensures each node appears at most once in any upward-extending path, while still considering the possibility of a full path turning at the current node when updating the global answer.",
  "solutionCode": "from typing import Optional\n\n# Definition for a binary tree node.\nclass TreeNode:\n    def __init__(self, val: int = 0, left: 'Optional[TreeNode]' = None, right: 'Optional[TreeNode]' = None):\n        self.val = val\n        self.left = left\n        self.right = right\n\nclass Solution:\n    def maxPathSum(self, root: Optional[TreeNode]) -> int:\n        self.best = float('-inf')\n        \n        def dfs(node: Optional[TreeNode]) -> int:\n            if not node:\n                return 0\n            # Gains from children; drop negatives\n            left_gain = max(dfs(node.left), 0)\n            right_gain = max(dfs(node.right), 0)\n            \n            # Path passing through this node (turning here)\n            curr_path_sum = node.val + left_gain + right_gain\n            self.best = max(self.best, curr_path_sum)\n            \n            # Return the best single-branch gain to parent\n            return node.val + max(left_gain, right_gain)\n        \n        dfs(root)\n        return self.best",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(H) recursion stack (worst-case O(N))"
};
