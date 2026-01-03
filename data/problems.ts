import { Problem } from '../types';

export const TWO_SUM_PROBLEM: Problem = {
  id: "1_twosum",
  title: "Two Sum",
  difficulty: "Easy",
  descriptionMarkdown: `
# Two Sum

Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the *same* element twice.

You can return the answer in any order.

## Example 1:

**Input:** nums = [2,7,11,15], target = 9
**Output:** [0,1]
**Explanation:** Because nums[0] + nums[1] == 9, we return [0, 1].

## Example 2:

**Input:** nums = [3,2,4], target = 6
**Output:** [1,2]

## Constraints:

- \`2 <= nums.length <= 10^4\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`-10^9 <= target <= 10^9\`
- **Only one valid answer exists.**
`,
  solutionExplanation: `
# Solution

The brute force approach is to loop through each element $x$ and find if there is another value that equals to $target - x$. This takes $O(n^2)$ time.

To improve this, we can use a **Hash Map**. 
While we iterate and inserting elements into the table, we also look back to check if current element's complement already exists in the table. If it exists, we have found a solution and return immediately.
`,
  solutionCode: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        hashmap = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in hashmap:
                return [hashmap[complement], i]
            hashmap[num] = i
        return []`
};

export const REVERSE_STRING_PROBLEM: Problem = {
  id: "344_reverse_string",
  title: "Reverse String",
  difficulty: "Easy",
  descriptionMarkdown: `
# Reverse String

Write a function that reverses a string. The input string is given as an array of characters \`s\`.

You must do this by modifying the input array **in-place** with \`O(1)\` extra memory.

## Example 1:

**Input:** s = ["h","e","l","l","o"]
**Output:** ["o","l","l","e","h"]

## Example 2:

**Input:** s = ["H","a","n","n","a","h"]
**Output:** ["h","a","n","n","a","H"]
`,
  solutionExplanation: `
# Solution

We can use the **Two Pointers** approach. 

One pointer, \`left\`, starts at the beginning of the array, and the other pointer, \`right\`, starts at the end. 
We swap the characters at these pointers and move them towards each other until they meet in the middle.
`,
  solutionCode: `class Solution:
    def reverseString(self, s: List[str]) -> None:
        left, right = 0, len(s) - 1
        while left < right:
            s[left], s[right] = s[right], s[left]
            left += 1
            right -= 1`
};

export const PROBLEMS = [TWO_SUM_PROBLEM, REVERSE_STRING_PROBLEM];
