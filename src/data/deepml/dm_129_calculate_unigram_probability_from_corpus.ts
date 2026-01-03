import { Problem } from '../../types';

export const DM_129_CALCULATE_UNIGRAM_PROBABILITY_FROM_CORPUS: Problem = {
  "id": "dm_129_calculate_unigram_probability_from_corpus",
  "title": "Calculate Unigram Probability from Corpus",
  "difficulty": "Easy",
  "tags": [
    "Probability"
  ],
  "descriptionMarkdown": "Implement a function that calculates the unigram probability of a given word in a corpus of sentences. Include start `<s>` and end `</s>` tokens in the calculation. The probability should be rounded to 4 decimal places.\n\nExample:\n- Input: `corpus = \"<s> Jack I like </s> <s> Jack I do like </s>\", word = \"Jack\"`\n- Output: `0.1818`\n- Reasoning: The corpus has 11 total tokens. 'Jack' appears twice. So, probability = 2 / 11",
  "solutionExplanation": "A unigram probability for a word is computed as the frequency of that word divided by the total number of tokens in the corpus. Since the problem requires including start and end tokens (`<s>` and `</s>`) in the calculation, we simply treat them like any other token during counting.\n\nTo compute this, we tokenize the corpus by whitespace, count how many times the target word appears, and divide by the total token count. We then round the result to four decimal places. While token strings cannot be directly represented as PyTorch tensors, we can still leverage PyTorch for numerical operations (division and rounding) to produce the final probability in a consistent and efficient way.",
  "solutionCode": "import torch\n\ndef unigram_probability(corpus: str, word: str) -> float:\n    \"\"\"\n    Calculate the unigram probability of `word` in the given `corpus`.\n    Includes special tokens like <s> and </s>. Rounds to 4 decimal places.\n\n    Args:\n        corpus (str): Space-separated token corpus.\n        word (str): Target word to compute probability for.\n\n    Returns:\n        float: Unigram probability rounded to 4 decimal places.\n    \"\"\"\n    # Count total tokens and occurrences of the target word\n    count = 0\n    total = 0\n    for token in corpus.split():  # split on whitespace keeps <s> and </s> tokens\n        total += 1\n        if token == word:\n            count += 1\n\n    if total == 0:\n        return 0.0\n\n    # Use PyTorch tensors for numerical operations and rounding\n    count_t = torch.tensor(count, dtype=torch.float32)\n    total_t = torch.tensor(total, dtype=torch.float32)\n    prob = count_t / total_t\n\n    # Round to 4 decimal places using PyTorch ops\n    prob = torch.round(prob * 10000.0) / 10000.0\n    return float(prob.item())\n\n\ndef solution():\n    # Example usage\n    corpus = \"<s> Jack I like </s> <s> Jack I do like </s>\"\n    word = \"Jack\"\n    result = unigram_probability(corpus, word)\n    print(result)  # Expected: 0.1818\n\nif __name__ == \"__main__\":\n    solution()\n",
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(N)",
  "platform": "deepml"
};
