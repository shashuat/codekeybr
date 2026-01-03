import { Problem } from '../../types';

export const UNIQUE_BINARY_SEARCH_TREES: Problem = {
  "id": "96_unique_binary_search_trees",
  "title": "Unique Binary Search Trees",
  "difficulty": "Medium",
  "tags": [
    "Dynamic Programming",
    "Math",
    "Tree"
  ],
  "descriptionMarkdown": "Given an integer n, return the number of structurally unique binary search trees (BSTs) that store values 1 through n.\n\nExamples:\n- Input: n = 3\n  Output: 5\n- Input: n = 1\n  Output: 1\n\nConstraints:\n- 1 <= n <= 19",
  "solutionExplanation": "Let G(n) be the number of unique BSTs that can be formed with values 1..n. Choosing a root i (1 <= i <= n) partitions the values into a left subtree with i-1 nodes and a right subtree with n-i nodes. The number of BSTs with root i is G(i-1) * G(n-i). Summing over all roots yields the recurrence: G(0) = G(1) = 1 and G(n) = sum_{i=1..n} G(i-1) * G(n-i). This sequence is the Catalan numbers.\n\nThe nth Catalan number is Cn = comb(2n, n) / (n + 1). We can compute comb(2n, n) exactly using an integer multiplicative formula without floating point: iteratively build the binomial coefficient with res = res * (n + k) // k for k = 1..n, then divide by (n + 1). This achieves O(n) time and O(1) extra space and is well within constraints.",
  "solutionCode": "class Solution:\n    def numTrees(self, n: int) -> int:\n        # Catalan number: Cn = comb(2n, n) // (n + 1)\n        # Compute comb(2n, n) iteratively using integer arithmetic.\n        res = 1\n        for k in range(1, n + 1):\n            res = res * (n + k) // k  # res becomes C(n + k, k)\n        return res // (n + 1)\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)"
};
