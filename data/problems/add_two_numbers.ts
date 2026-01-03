import { Problem } from '../../types';

export const ADD_TWO_NUMBERS: Problem = {
  "id": "2_add_two_numbers",
  "title": "Add Two Numbers",
  "difficulty": "Medium",
  "tags": [
    "Linked List",
    "Math"
  ],
  "descriptionMarkdown": "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each node contains a single digit. Add the two numbers and return the sum as a linked list.\n\nYou may assume the two numbers do not contain any leading zero, except the number 0 itself.\n\nExample 1:\n```\nInput:  l1 = [2,4,3], l2 = [5,6,4]\nOutput: [7,0,8]\nExplanation: 342 + 465 = 807.\n```\n\nExample 2:\n```\nInput:  l1 = [0], l2 = [0]\nOutput: [0]\n```\n\nExample 3:\n```\nInput:  l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]\nOutput: [8,9,9,9,0,0,0,1]\n```\n\nConstraints:\n- The number of nodes in each linked list is in the range [1, 100].\n- 0 <= Node.val <= 9\n- It is guaranteed that the list represents a number that does not have leading zeros.",
  "solutionExplanation": "Treat the addition like elementary school addition with a carry. Traverse both lists from head to tail (least significant to most significant digit). At each step, sum the current digits and the carry, create a new node with value sum % 10, and update the carry to sum // 10. Advance each list if it still has nodes.\n\nA dummy head simplifies list construction: append new result nodes to its next pointer. Continue until both lists are exhausted and there is no remaining carry. This approach never converts the lists to integers and works for arbitrarily long inputs limited only by list lengths.",
  "solutionCode": "from typing import Optional\n\nclass ListNode:\n    def __init__(self, val: int = 0, next: Optional['ListNode'] = None):\n        self.val = val\n        self.next = next\n\nclass Solution:\n    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n        dummy = ListNode(0)\n        curr = dummy\n        carry = 0\n\n        p, q = l1, l2\n        while p is not None or q is not None or carry:\n            x = p.val if p is not None else 0\n            y = q.val if q is not None else 0\n            total = x + y + carry\n            carry = total // 10\n            curr.next = ListNode(total % 10)\n            curr = curr.next\n            if p is not None:\n                p = p.next\n            if q is not None:\n                q = q.next\n\n        return dummy.next",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)"
};
