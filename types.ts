export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  descriptionMarkdown: string; // The textual question
  solutionCode: string; // The code to be typed
  solutionExplanation: string; // Explanation text before the code
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
