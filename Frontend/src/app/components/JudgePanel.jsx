import React from 'react';

export default function JudgePanel({ judgeData }) {
  const winner = judgeData.solution_1_score > judgeData.solution_2_score ? 1 : 2;

  return (
    <div className="max-w-6xl mx-auto w-full px-4 mb-12">
      <div className="glass rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Abstract background highlight */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest text-accent uppercase">Final Verdict</span>
            </div>
            <h2 className="text-4xl font-extrabold mb-4 italic">
              Solution {winner} <span className="text-accent">Wins</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-accent to-transparent mb-6"></div>
          </div>

          <div className="flex gap-8 items-center justify-center">
            <ScoreBadge score={judgeData.solution_1_score} label="Solution 1" isWinner={winner === 1} />
            <div className="text-2xl font-bold text-on-surface-variant/30 font-mono italic">VS</div>
            <ScoreBadge score={judgeData.solution_2_score} label="Solution 2" isWinner={winner === 2} />
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8 border-t border-white/5 pt-8">
          <div>
            <h4 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-3">Judge Reasoning (S1)</h4>
            <p className="text-on-surface-variant leading-relaxed italic text-sm">
              "{judgeData.solution_1_reason}"
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-3">Judge Reasoning (S2)</h4>
            <p className="text-on-surface-variant leading-relaxed italic text-sm">
              "{judgeData.solution_2_reason}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreBadge({ score, label, isWinner }) {
  return (
    <div className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-500 ${isWinner ? 'bg-primary/10 ring-1 ring-primary/30' : 'bg-surface-low/50 opacity-60'}`}>
      <span className="text-xs font-bold text-on-surface-variant uppercase">{label}</span>
      <div className={`text-4xl font-black font-mono ${isWinner ? 'text-primary' : 'text-on-surface-variant'}`}>
        {score}<span className="text-xl opacity-50">/10</span>
      </div>
      {isWinner && (
        <span className="text-[10px] font-black bg-primary text-background px-2 py-0.5 rounded-full uppercase tracking-tighter">Champion</span>
      )}
    </div>
  );
}
