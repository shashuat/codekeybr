import { Problem } from '../../types';

export const MERGE_TWO_SORTED_LISTS: Problem = {
  "id": "21_merge_two_sorted_lists",
  "title": "Merge Two Sorted Lists",
  "difficulty": "Easy",
  "tags": [
    "Linked List",
    "Two Pointers"
  ],
  "descriptionMarkdown": "You are given the heads of two sorted linked lists list1 and list2.\n\nMerge the two lists into one sorted list by splicing together the nodes of the first two lists. Return the head of the merged linked list.\n\nExamples:\n\nExample 1:\n```\nInput:  list1 = [1,2,4], list2 = [1,3,4]\nOutput: [1,1,2,3,4,4]\n```\n\nExample 2:\n```\nInput:  list1 = [], list2 = []\nOutput: []\n```\n\nExample 3:\n```\nInput:  list1 = [], list2 = [0]\nOutput: [0]\n```\n\nConstraints:\n- The number of nodes in both lists is in the range [0, 50].\n- -100 <= Node.val <= 100\n- Both list1 and list2 are sorted in non-decreasing order.",
  "solutionExplanation": "Use two pointers to traverse both lists and a dummy head to simplify list construction. Compare the current nodes of both lists, append the smaller node to the result, and advance that list's pointer. Continue until one list is exhausted, then attach the remaining nodes from the other list.\n\nThis approach reuses the existing nodes (splicing) and maintains sorted order because at each step it chooses the smallest available head. Using a dummy head avoids handling edge cases for the first node and simplifies returning the merged list's head.",
  "solutionCode": "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nfrom typing import Optional\n\nclass Solution:\n    def mergeTwoLists(self, list1: Optional['ListNode'], list2: Optional['ListNode']) -> Optional['ListNode']:\n        dummy = ListNode()\n        tail = dummy\n\n        p1, p2 = list1, list2\n        while p1 and p2:\n            if p1.val <= p2.val:\n                tail.next = p1\n                p1 = p1.next\n            else:\n                tail.next = p2\n                p2 = p2.next\n            tail = tail.next\n\n        # Attach any remaining nodes\n        tail.next = p1 if p1 else p2\n        return dummy.next",
  "timeComplexity": "O(m + n)",
  "spaceComplexity": "O(1)"
};
