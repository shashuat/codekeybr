import { Problem } from '../../types';

export const BEST_TIME_TO_BUY_AND_SELL_STOCK: Problem = {
  "id": "121_best_time_to_buy_and_sell_stock",
  "title": "Best Time to Buy and Sell Stock",
  "difficulty": "Easy",
  "tags": [
    "Array",
    "Dynamic Programming"
  ],
  "descriptionMarkdown": "You are given an array prices where prices[i] is the price of a given stock on the i-th day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and a different future day to sell it.\n\nReturn the maximum profit you can achieve from this transaction. If no profit is possible, return 0.\n\nExamples:\n\n- Example 1:\n  Input: prices = [7,1,5,3,6,4]\n  Output: 5\n  Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5. You must buy before you sell.\n\n- Example 2:\n  Input: prices = [7,6,4,3,1]\n  Output: 0\n  Explanation: No profitable transactions; return 0.\n\nConstraints:\n- 1 <= prices.length <= 1e5\n- 0 <= prices[i] <= 1e4",
  "solutionExplanation": "Scan the array once while maintaining two values: the minimum price seen so far and the best (maximum) profit found so far. For each price, compute the profit if you sold today (current price minus the minimum so far) and update the maximum profit. Also update the minimum price whenever you encounter a lower price.\n\nThis works because the optimal buy must occur before the sell, and tracking the running minimum guarantees that for each day you consider the best possible buy up to that point. If prices are non-increasing, the best profit remains 0.",
  "solutionCode": "from typing import List\n\nclass Solution:\n    def maxProfit(self, prices: List[int]) -> int:\n        min_price = float('inf')\n        max_profit = 0\n        for price in prices:\n            if price < min_price:\n                min_price = price\n            else:\n                profit = price - min_price\n                if profit > max_profit:\n                    max_profit = profit\n        return max_profit",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)"
};
