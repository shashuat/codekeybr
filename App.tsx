import React, { useState } from 'react';
import { ProblemViewer } from './components/ProblemViewer';
import { TypingArea } from './components/TypingArea';
import { StatsModal } from './components/StatsModal';
import { PROBLEMS } from './data/problems';
import { TypingState } from './types';
import { Code, Github, Terminal, Trophy, List, ArrowLeft, Star, Clock } from 'lucide-react';

type View = 'practice' | 'problems' | 'leaderboard';

export default function App() {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [view, setView] = useState<View>('practice');
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [lastStats, setLastStats] = useState<TypingState | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // Used to reset key components

  const currentProblem = PROBLEMS[currentProblemIndex];

  const handleComplete = (stats: TypingState) => {
    setLastStats(stats);
    setStatsModalOpen(true);
  };

  const handleRetry = () => {
    setStatsModalOpen(false);
    setRefreshKey(prev => prev + 1);
  };

  const switchProblem = (index: number) => {
    setCurrentProblemIndex(index);
    setView('practice');
    setRefreshKey(prev => prev + 1);
  };

  // --- Views ---

  const ProblemsView = () => (
    <div className="flex-1 p-8 overflow-y-auto max-w-5xl mx-auto w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Problem Set</h2>
        <p className="text-slate-400">Select a challenge to practice your muscle memory.</p>
      </div>
      <div className="grid gap-4">
        {PROBLEMS.map((problem, idx) => (
          <div 
            key={problem.id}
            onClick={() => switchProblem(idx)}
            className="group bg-surface border border-slate-700/50 p-6 rounded-xl hover:border-primary/50 hover:bg-slate-800/50 transition-all cursor-pointer flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{problem.title}</h3>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                  problem.difficulty === 'Easy' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                  problem.difficulty === 'Medium' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' :
                  'bg-red-500/10 border-red-500/20 text-red-400'
                }`}>
                  {problem.difficulty}
                </span>
              </div>
              <p className="text-sm text-slate-400 line-clamp-1">Practice implementation for {problem.title}...</p>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-primary font-bold text-sm flex items-center gap-1">Start <ArrowLeft className="rotate-180 w-4 h-4" /></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const LeaderboardView = () => (
    <div className="flex-1 p-8 overflow-y-auto max-w-4xl mx-auto w-full">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/10 mb-4">
          <Trophy className="w-8 h-8 text-yellow-500" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Global Leaderboard</h2>
        <p className="text-slate-400">Top typists this week.</p>
      </div>
      
      <div className="bg-surface border border-slate-700/50 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase font-bold tracking-wider">
            <tr>
              <th className="p-4 pl-6">Rank</th>
              <th className="p-4">User</th>
              <th className="p-4 text-right">Avg WPM</th>
              <th className="p-4 text-right">Accuracy</th>
              <th className="p-4 text-right pr-6">Problems Solved</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50 text-sm">
            {[
              { rank: 1, user: "vim_master_99", wpm: 142, acc: "99%", solved: 342 },
              { rank: 2, user: "code_ninja", wpm: 128, acc: "98%", solved: 215 },
              { rank: 3, user: "pythonista_xyz", wpm: 115, acc: "96%", solved: 189 },
              { rank: 4, user: "syntax_error", wpm: 98, acc: "94%", solved: 56 },
              { rank: 5, user: "you", wpm: "-", acc: "-", solved: 0 },
            ].map((row, i) => (
              <tr key={i} className={`hover:bg-slate-800/30 transition-colors ${row.user === 'you' ? 'bg-primary/5' : ''}`}>
                <td className="p-4 pl-6 font-mono text-slate-500">#{row.rank}</td>
                <td className="p-4 font-medium text-white flex items-center gap-2">
                  {row.rank <= 3 && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                  {row.user}
                </td>
                <td className="p-4 text-right font-mono text-primary">{row.wpm}</td>
                <td className="p-4 text-right font-mono text-success">{row.acc}</td>
                <td className="p-4 text-right pr-6 text-slate-300">{row.solved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="h-screen w-screen bg-background flex flex-col overflow-hidden text-slate-200">
      {/* Navbar */}
      <header className="h-14 border-b border-slate-700/50 bg-slate-900/50 flex items-center justify-between px-6 flex-shrink-0 z-20 backdrop-blur-sm">
        <div 
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setView('practice')}
        >
          <div className="bg-primary/10 p-1.5 rounded-lg">
             <Terminal className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">Code<span className="text-primary">Keybr</span></span>
        </div>
        
        <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
           <button 
             onClick={() => setView('problems')}
             className={`hover:text-white transition-colors flex items-center gap-1 ${view === 'problems' ? 'text-primary' : ''}`}
            >
              <List className="w-4 h-4" />
              Problems
            </button>
           <button 
             onClick={() => setView('leaderboard')}
             className={`hover:text-white transition-colors flex items-center gap-1 ${view === 'leaderboard' ? 'text-primary' : ''}`}
            >
              <Trophy className="w-4 h-4" />
              Leaderboard
            </button>
           <a 
             href="https://github.com" 
             target="_blank" 
             rel="noopener noreferrer"
             className="hover:text-white transition-colors flex items-center gap-2"
           >
             <Github className="w-4 h-4" />
             <span>GitHub</span>
           </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        {view === 'practice' ? (
          <>
            {/* Left: Problem Description */}
            <div className="w-1/2 min-w-[400px] h-full overflow-hidden hidden md:block">
              <ProblemViewer 
                title={currentProblem.title}
                difficulty={currentProblem.difficulty}
                markdown={currentProblem.descriptionMarkdown}
              />
            </div>

            {/* Right: Typing Interface */}
            <div className="w-full md:w-1/2 h-full bg-background border-l border-slate-700/30">
              <TypingArea 
                key={refreshKey} // Forces remount on retry/switch
                explanation={currentProblem.solutionExplanation}
                code={currentProblem.solutionCode}
                onComplete={handleComplete}
              />
            </div>
          </>
        ) : view === 'problems' ? (
          <ProblemsView />
        ) : (
          <LeaderboardView />
        )}
      </main>

      {/* Stats Modal */}
      {lastStats && (
        <StatsModal 
          isOpen={statsModalOpen} 
          stats={lastStats} 
          onClose={() => setStatsModalOpen(false)}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}
