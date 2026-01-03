import { Problem } from '../../types';

export const CONTAINS_DUPLICATE: Problem = {
  "id": "217_contains_duplicate",
  "title": "Contains Duplicate",
  "difficulty": "Easy",
  "tags": ["Array", "Hash Table", "Sorting"],
  "descriptionMarkdown": `# Contains Duplicate

Given an integer array \`nums\`, return \`true\` if any value appears **at least twice** in the array, and return \`false\` if every element is distinct.

## Example 1:

**Input:** nums = [1,2,3,1]
**Output:** true

## Example 2:

**Input:** nums = [1,2,3,4]
**Output:** false

## Example 3:

**Input:** nums = [1,1,1,3,3,4,3,2,4,2]
**Output:** true

## Constraints:

- \`1 <= nums.length <= 10^5\`
- \`-10^9 <= nums[i] <= 10^9\``,
  "solutionExplanation": `# Solution

The most efficient approach is to use a **Hash Set**. 

As we iterate through the array, we check if each element already exists in the set. If it does, we've found a duplicate and return \`true\`. If we reach the end without finding duplicates, we return \`false\`.

This approach provides optimal time complexity at the cost of additional space for the set.`,
  "solutionCode": `class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        seen = set()
        for num in nums:
            if num in seen:
                return True
            seen.add(num)
        return False`,
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(N)"
};
