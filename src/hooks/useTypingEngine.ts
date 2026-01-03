import { useReducer, useEffect, useCallback, useRef } from 'react';
import { TypingState, TypingAction } from '../types';
import { CHARS_PER_WORD } from '../constants';

const initialState: TypingState = {
  cursorIndex: 0,
  userInput: '',
  mistakes: 0,
  startTime: null,
  endTime: null,
  isActive: false,
  wpmHistory: []
};

function typingReducer(state: TypingState, action: TypingAction): TypingState {
  switch (action.type) {
    case 'START':
      return { ...state, isActive: true, startTime: Date.now() };
    
    case 'RESET':
      return initialState;

    case 'TAB': {
      if (state.endTime) return state;

      const { target } = action;
      const remainingText = target.slice(state.cursorIndex);
      
      // Smart Tab: Check if the upcoming text is spaces
      // We consume up to 4 spaces, or 2 spaces, depending on what's there.
      // Prioritize 4 spaces (common indentation)
      let spacesToConsume = 0;
      
      if (remainingText.startsWith('    ')) {
        spacesToConsume = 4;
      } else if (remainingText.startsWith('  ')) {
        spacesToConsume = 2; // For 2-space indentation or remaining parts
      }

      if (spacesToConsume > 0) {
         const nextIndex = state.cursorIndex + spacesToConsume;
         const isFinished = nextIndex === target.length;
         
         return {
           ...state,
           cursorIndex: nextIndex,
           userInput: state.userInput + ' '.repeat(spacesToConsume),
           endTime: isFinished ? Date.now() : null,
           isActive: !isFinished
         };
      } else {
         // Tab pressed but no spaces to fill -> Mistake
         return {
           ...state,
           mistakes: state.mistakes + 1
         };
      }
    }

    case 'KEY_PRESS': {
      if (state.endTime) return state; // Already finished

      const { char, target } = action;
      const targetChar = target[state.cursorIndex];
      
      // Handle end of content
      if (state.cursorIndex >= target.length) return state;

      // Check if target char is a special character (not alphanumeric or whitespace)
      const isSpecialChar = targetChar && !/[a-zA-Z0-9\s]/.test(targetChar);
      
      // Handle correctness with flexible matching:
      // 1. Enter key can skip special characters OR match newlines
      // 2. Case-insensitive matching for letters
      // 3. Exact match for everything else
      const isEnter = char === 'Enter';
      const canSkipWithEnter = isEnter && isSpecialChar;
      const isNewlineMatch = isEnter && targetChar === '\n';
      const isCaseInsensitiveMatch = char.toLowerCase() === targetChar.toLowerCase();
      const isExactMatch = char === targetChar;
      
      const isMatch = isExactMatch || isCaseInsensitiveMatch || isNewlineMatch || canSkipWithEnter;

      if (isMatch) {
        const nextIndex = state.cursorIndex + 1;
        const isFinished = nextIndex === target.length;
        
        return {
          ...state,
          cursorIndex: nextIndex,
          userInput: state.userInput + targetChar,
          endTime: isFinished ? Date.now() : null,
          isActive: !isFinished
        };
      } else {
        // Mistake made
        return {
          ...state,
          mistakes: state.mistakes + 1
        };
      }
    }
    default:
      return state;
  }
}

export const useTypingEngine = (targetText: string) => {
  const [state, dispatch] = useReducer(typingReducer, initialState);
  const intervalRef = useRef<number | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Ignore meta keys, control keys, etc. unless needed
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    
    // Handle Tab specifically
    if (e.key === 'Tab') {
      e.preventDefault();
      dispatch({ type: 'TAB', target: targetText });
      return;
    }

    if (e.key.length > 1 && e.key !== 'Enter') return; // Ignore Shift, other special keys

    e.preventDefault();

    if (!state.isActive && !state.endTime && state.cursorIndex === 0) {
      dispatch({ type: 'START' });
    }

    dispatch({ type: 'KEY_PRESS', char: e.key, target: targetText });
  }, [state.isActive, state.endTime, state.cursorIndex, targetText]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  // WPM History interval
  useEffect(() => {
    if (state.isActive && !state.endTime) {
      intervalRef.current = window.setInterval(() => {
        const timeElapsedMin = (Date.now() - (state.startTime || Date.now())) / 60000;
        if (timeElapsedMin > 0) {
            // WPM calc logic if needed for history
        }
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state.isActive, state.endTime, state.startTime, state.cursorIndex]);

  return {
    state,
    handleKeyDown,
    reset
  };
};