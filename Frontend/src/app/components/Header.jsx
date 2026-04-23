import React from 'react';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-container rounded-lg flex items-center justify-center font-bold text-background">
          A
        </div>
        <h1 className="text-xl font-bold tracking-tight">AI BATTLE <span className="text-primary">ARENA</span></h1>
      </div>
      <nav className="flex gap-8">
        {['Arena', 'History', 'Leaderboard', 'Models'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
          >
            {item}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <span className="text-xs px-2 py-1 rounded bg-surface-high text-accent font-mono">STRATUM V1</span>
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
      </div>
    </header>
  );
}
