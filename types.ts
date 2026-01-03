export type Platform = 'leetcode' | 'codeforces' | 'deepml';

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[]; // For filtering by category (e.g., "Arrays", "Hash Table")
  descriptionMarkdown: string; // The textual question
  solutionCode: string; // The code to be typed
  solutionExplanation: string; // Explanation text before the code
  timeComplexity: string; // e.g., "O(N)"
  spaceComplexity: string; // e.g., "O(1)"
  platform: Platform; // The platform this problem is from
}

export interface PlatformCategory {
  name: string;
  displayName: string;
  platform: Platform;
  problems: Problem[];
  description: string;
}

export interface TypingState {
  cursorIndex: number;
  userInput: string; // What the user has typed correctly so far
  mistakes: number;
  startTime: number | null;
  endTime: number | null;
  isActive: boolean;
  wpmHistory: { time: number; wpm: number }[];
}

export type TypingAction =
  | { type: 'START' }
  | { type: 'KEY_PRESS'; char: string; target: string }
  | { type: 'TAB'; target: string }
  | { type: 'RESET' };
