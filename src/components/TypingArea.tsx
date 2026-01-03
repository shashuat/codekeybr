import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useTypingEngine } from '../hooks/useTypingEngine';
import { RotateCcw, Keyboard, Play } from 'lucide-react';
import { CHARS_PER_WORD } from '../constants';
import { TypingState } from '../types';

interface TypingAreaProps {
  explanation: string;
  code: string;
  timeComplexity: string;
  spaceComplexity: string;
  onComplete: (state: TypingState) => void;
}

export const TypingArea: React.FC<TypingAreaProps> = ({ 
  explanation, 
  code, 
  timeComplexity, 
  spaceComplexity, 
  onComplete 
}) => {
  // Combine explanation, complexity info, and code into one target string
  // Add clear visual separators in the text structure (newlines)
  const fullText = useMemo(() => {
    return `${explanation.trim()}\n\n\nComplexity: ${timeComplexity} Time | ${spaceComplexity} Space\n\n\n${code.trim()}`;
  }, [explanation, code, timeComplexity, spaceComplexity]);

  const { state, handleKeyDown, reset } = useTypingEngine(fullText);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [focus, setFocus] = useState(false);

  // Auto-scroll logic to keep cursor in view
  useEffect(() => {
    if (cursorRef.current && containerRef.current) {
      const container = containerRef.current;
      const cursor = cursorRef.current;
      
      const cursorTop = cursor.offsetTop;
      const cursorBottom = cursorTop + cursor.offsetHeight;
      const containerTop = container.scrollTop;
      const containerBottom = containerTop + container.offsetHeight;

      // Padding for scroll context
      if (cursorBottom > containerBottom - 50) {
        container.scrollTo({ top: cursorTop - 100, behavior: 'smooth' });
      }
    }
  }, [state.cursorIndex]);

  useEffect(() => {
    if (state.endTime) {
      onComplete(state);
    }
  }, [state.endTime, onComplete, state]);

  // WPM Calculation
  const wpm = state.startTime 
    ? Math.round((state.cursorIndex / CHARS_PER_WORD) / ((Date.now() - state.startTime) / 60000)) 
    : 0;

  return (
    <div 
      className="h-full flex flex-col relative bg-background"
      onClick={() => {
        containerRef.current?.focus();
        setFocus(true);
      }}
    >
      {/* Header / Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 bg-slate-900/30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">WPM</span>
            <span className="text-xl font-mono font-bold text-primary">{wpm || 0}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Errors</span>
            <span className="text-xl font-mono font-bold text-error">{state.mistakes}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
           {!focus && !state.endTime && (
             <div className="flex items-center gap-2 text-yellow-500 animate-pulse mr-4">
               <Keyboard className="w-4 h-4" />
               <span className="text-xs font-bold">Click to Focus</span>
             </div>
           )}
          <button 
            onClick={(e) => { e.stopPropagation(); reset(); containerRef.current?.focus(); }}
            className="p-2 hover:bg-slate-700 rounded-md transition-colors text-slate-400 hover:text-white"
            title="Reset"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Typing Area */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto p-8 outline-none cursor-text font-mono text-lg leading-loose whitespace-pre-wrap break-words relative"
        tabIndex={0}
        onKeyDown={(e) => {
            // Because React synthetic events might clash with hooks, passing native event
            handleKeyDown(e.nativeEvent);
        }}
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
      >
        {!focus && !state.endTime && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="bg-surface border border-slate-700 p-6 rounded-xl shadow-2xl text-center">
                    <Play className="w-12 h-12 text-primary mx-auto mb-4 fill-current opacity-80" />
                    <h3 className="text-xl font-bold text-white mb-2">Ready to Code?</h3>
                    <p className="text-slate-400 mb-6">Click anywhere to start. <br/>Type the <span className="text-primary font-bold">Solution Strategy</span> first, then the <span className="text-green-400 font-bold">Code</span>.</p>
                </div>
            </div>
        )}

        {/* The Text Rendering */}
        <div className="relative min-h-[500px] pb-32">
          {fullText.split('').map((char, index) => {
            let className = "transition-colors duration-75 ";
            let isCurrent = index === state.cursorIndex;
            let hasBeenTyped = index < state.cursorIndex;

            if (isCurrent) {
                // Current cursor position
                className += "bg-primary/20 text-primary border-b-2 border-primary animate-pulse ";
            } else if (hasBeenTyped) {
                // Correctly typed
                // We can add subtle syntax highlighting simulation here if we parsed the structure
                // For now, keep it simple grey for typed text
                className += "text-slate-500 ";
            } else {
                // Future text
                className += "text-slate-700 ";
            }

            return (
              <span 
                key={index} 
                ref={isCurrent ? cursorRef : null}
                className={className}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};