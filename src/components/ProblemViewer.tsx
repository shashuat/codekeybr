import React from 'react';
import { BookOpen } from 'lucide-react';

interface ProblemViewerProps {
  markdown: string;
  title: string;
  difficulty: string;
}

// Simple regex-based markdown parser to avoid heavy dependencies for this demo
const SimpleMarkdown = ({ text }: { text: string }) => {
  const lines = text.split('\n');
  return (
    <div className="space-y-3 text-sm leading-relaxed text-slate-300">
      {lines.map((line, idx) => {
        if (line.startsWith('# ')) return <h1 key={idx} className="text-2xl font-bold text-white mt-4">{line.replace('# ', '')}</h1>;
        if (line.startsWith('## ')) return <h2 key={idx} className="text-xl font-semibold text-primary mt-6 mb-2">{line.replace('## ', '')}</h2>;
        if (line.startsWith('- ')) return <li key={idx} className="ml-4 list-disc text-slate-400">{line.replace('- ', '')}</li>;
        if (line.startsWith('```')) return null; // Skip code fences for now, or handle them
        if (line.trim() === '') return <div key={idx} className="h-2" />;
        
        // Inline bold/code handling (very basic)
        const parts = line.split(/(\*\*.*?\*\*|`.*?`)/g);
        return (
          <p key={idx} className="block">
            {parts.map((part, pIdx) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={pIdx} className="text-white font-medium">{part.slice(2, -2)}</strong>;
              }
              if (part.startsWith('`') && part.endsWith('`')) {
                return <code key={pIdx} className="bg-slate-800 px-1 py-0.5 rounded text-primary font-mono text-xs">{part.slice(1, -1)}</code>;
              }
              return part;
            })}
          </p>
        );
      })}
    </div>
  );
};

export const ProblemViewer: React.FC<ProblemViewerProps> = ({ markdown, title, difficulty }) => {
  const difficultyColor = 
    difficulty === 'Easy' ? 'text-green-400' : 
    difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="h-full flex flex-col bg-surface border-r border-slate-700/50">
      <div className="p-6 border-b border-slate-700/50 bg-slate-900/30">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h1 className="text-xl font-bold text-white tracking-tight">{title}</h1>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full bg-slate-800 border border-slate-700 ${difficultyColor}`}>
          {difficulty}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
        <SimpleMarkdown text={markdown} />
      </div>
    </div>
  );
};
