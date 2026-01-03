import { Problem } from '../../types';

export const REMOVE_NTH_NODE_FROM_END_OF_LIST: Problem = {
  "id": "19_remove_nth_node_from_end_of_list",
  "title": "Remove Nth Node From End of List",
  "difficulty": "Medium",
  "tags": [
    "Linked List",
    "Two Pointers"
  ],
  "descriptionMarkdown": "Given the head of a linked list, remove the nth node from the end of the list and return its head.\n\nExamples:\n\nExample 1:\nInput: head = [1,2,3,4,5], n = 2\nOutput: [1,2,3,5]\n\nExample 2:\nInput: head = [1], n = 1\nOutput: []\n\nExample 3:\nInput: head = [1,2], n = 1\nOutput: [1]\n\nConstraints:\n- The number of nodes in the list is sz.\n- 1 <= sz <= 30\n- 0 <= Node.val <= 100\n- 1 <= n <= sz\n\nFollow up: Could you do this in one pass?",
  "solutionExplanation": "Use two pointers with a dummy head to perform the removal in one pass. Create a dummy node that points to head to simplify edge cases (such as removing the first node). Position a fast pointer n+1 steps ahead of a slow pointer, both starting at the dummy. This ensures the gap between fast and slow is exactly n nodes.\n\nThen move both pointers forward together until fast reaches the end (None). At that point, slow is just before the node to remove. Unlink slow.next by setting slow.next = slow.next.next, and return dummy.next as the new head. The dummy node cleanly handles cases where the head itself is removed.",
  "solutionCode": "from typing import Optional\n\n# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\n\nclass Solution:\n    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:\n        dummy = ListNode(0, head)\n        fast = dummy\n        slow = dummy\n\n        # Move fast n+1 steps to maintain a gap of n between fast and slow\n        for _ in range(n + 1):\n            fast = fast.next\n\n        # Move both pointers until fast reaches the end\n        while fast is not None:\n            fast = fast.next\n            slow = slow.next\n\n        # Remove the target node\n        slow.next = slow.next.next\n        return dummy.next",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)"
};
