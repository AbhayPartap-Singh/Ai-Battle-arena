import React from 'react';

export default function SolutionCard({ title, content, solutionId }) {
  // Simple "markdown" formatter for the demo
  const formatContent = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-xl font-bold mt-6 mb-3 text-primary">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('- ')) {
        return (
          <li key={i} className="ml-4 mb-2 flex gap-2">
            <span className="text-accent mt-1 text-sm">✦</span>
            <span>{line.replace('- ', '')}</span>
          </li>
        );
      }
      if (line.trim() === '') return <div key={i} className="h-4" />;
      return <p key={i} className="mb-4 text-on-surface-variant leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="card-premium rounded-3xl p-8 flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Solution {solutionId}</h2>
        <span className="px-3 py-1 rounded-full bg-surface-high text-xs font-mono text-on-surface-variant">MODEL_{solutionId === 1 ? 'ALPHA' : 'BETA'}</span>
      </div>
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {formatContent(content)}
      </div>
    </div>
  );
}
