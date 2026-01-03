import { Problem } from '../../types';

export const MERGE_K_SORTED_LISTS: Problem = {
  "id": "23_merge_k_sorted_lists",
  "title": "Merge k Sorted Lists",
  "difficulty": "Hard",
  "tags": [
    "Linked List",
    "Heap / Priority Queue",
    "Divide and Conquer"
  ],
  "descriptionMarkdown": "You are given an array of k linked lists, each sorted in ascending order.\n\nMerge all the linked lists into one sorted linked list and return it.\n\nExample 1:\n\n```\nInput:  lists = [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]\nExplanation:\nThe linked lists are:\n[\n  1->4->5,\n  1->3->4,\n  2->6\n]\nMerging them into one sorted linked list:\n1->1->2->3->4->4->5->6\n```\n\nExample 2:\n\n```\nInput:  lists = []\nOutput: []\n```\n\nExample 3:\n\n```\nInput:  lists = [[]]\nOutput: []\n```\n\nConstraints:\n- k == lists.length\n- 0 <= k <= 10^4\n- 0 <= lists[i].length <= 500\n- -10^4 <= lists[i][j] <= 10^4\n- lists[i] is sorted in ascending order.\n- The sum of lists[i].length will not exceed 10^4.",
  "solutionExplanation": "A min-heap (priority queue) efficiently tracks the smallest current node among the k list heads. Initialize the heap with the head of each non-empty list. Repeatedly extract the smallest node, append it to the result, and push its next node (if any) back into the heap. This guarantees we always take the next globally smallest element while only storing up to k candidates at a time.\n\nAn alternative is divide-and-conquer: iteratively merge lists in pairs (like merge sort) until one list remains. Both approaches run in O(N log k), where N is the total number of nodes. The heap approach uses O(k) extra space for the priority queue, while a careful iterative pairwise merge can use O(1) extra space (besides the output) but is more involved to implement. The heap solution is concise and robust for large k.",
  "solutionCode": "from typing import List, Optional\nimport heapq\n\n# Definition for singly-linked list.\nclass ListNode:\n    def __init__(self, val: int = 0, next: Optional['ListNode'] = None):\n        self.val = val\n        self.next = next\n\nclass Solution:\n    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:\n        if not lists:\n            return None\n        heap: List[tuple[int, int, ListNode]] = []\n        for i, node in enumerate(lists):\n            if node is not None:\n                heapq.heappush(heap, (node.val, i, node))\n\n        dummy = ListNode(0)\n        tail = dummy\n\n        while heap:\n            val, i, node = heapq.heappop(heap)\n            tail.next = node\n            tail = tail.next\n            if node.next is not None:\n                heapq.heappush(heap, (node.next.val, i, node.next))\n\n        tail.next = None\n        return dummy.next",
  "timeComplexity": "O(N log k)",
  "spaceComplexity": "O(k)"
};
