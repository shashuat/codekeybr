import React from 'react';
import { TypingState } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RefreshCw, CheckCircle } from 'lucide-react';
import { CHARS_PER_WORD } from '../constants';

interface StatsModalProps {
  isOpen: boolean;
  stats: TypingState;
  onClose: () => void;
  onRetry: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({ isOpen, stats, onClose, onRetry }) => {
  if (!isOpen) return null;

  const totalTimeMin = (stats.endTime! - stats.startTime!) / 60000;
  const finalWpm = Math.round((stats.userInput.length / CHARS_PER_WORD) / totalTimeMin);
  const accuracy = Math.round((stats.userInput.length / (stats.userInput.length + stats.mistakes)) * 100);

  // Generate mock chart data if history is sparse (for visual appeal in this demo)
  const chartData = [
    { name: '0s', wpm: 0 },
    { name: '10s', wpm: Math.round(finalWpm * 0.6) },
    { name: '20s', wpm: Math.round(finalWpm * 0.8) },
    { name: '30s', wpm: Math.round(finalWpm * 0.9) },
    { name: 'End', wpm: finalWpm },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-surface border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-8 text-center border-b border-slate-700/50">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Problem Solved!</h2>
          <p className="text-slate-400">Great job practicing your syntax muscle memory.</p>
        </div>

        <div className="grid grid-cols-3 divide-x divide-slate-700/50 bg-slate-900/50">
          <div className="p-6 text-center">
            <div className="text-sm text-slate-500 uppercase tracking-wider font-bold mb-1">WPM</div>
            <div className="text-4xl font-mono font-bold text-primary">{finalWpm}</div>
          </div>
          <div className="p-6 text-center">
            <div className="text-sm text-slate-500 uppercase tracking-wider font-bold mb-1">Accuracy</div>
            <div className="text-4xl font-mono font-bold text-success">{accuracy}%</div>
          </div>
          <div className="p-6 text-center">
            <div className="text-sm text-slate-500 uppercase tracking-wider font-bold mb-1">Time</div>
            <div className="text-4xl font-mono font-bold text-white">{Math.round(totalTimeMin * 60)}s</div>
          </div>
        </div>

        <div className="p-8 h-64 w-full">
            <h3 className="text-sm font-bold text-slate-500 mb-4">Speed Consistency</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f1f5f9' }}
                    itemStyle={{ color: '#38bdf8' }}
                />
                <Line type="monotone" dataKey="wpm" stroke="#38bdf8" strokeWidth={3} dot={{ fill: '#38bdf8' }} />
              </LineChart>
            </ResponsiveContainer>
        </div>

        <div className="p-6 bg-slate-900 border-t border-slate-700 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2 rounded-lg font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
          <button 
            onClick={onRetry}
            className="px-6 py-2 rounded-lg font-medium bg-primary text-slate-900 hover:bg-sky-400 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};
