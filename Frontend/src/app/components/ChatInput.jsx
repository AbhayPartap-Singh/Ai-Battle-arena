import React, { useState } from 'react';

export default function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <section className="max-w-4xl mx-auto w-full px-4 py-12">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative flex items-center glass rounded-2xl p-2 shadow-2xl">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask a question to the AI Battle Arena..."
            className="flex-1 bg-transparent px-6 py-4 text-lg outline-none placeholder:text-on-surface-variant/50"
          />
          <button
            type="submit"
            className="btn-primary"
          >
            Engage
          </button>
        </div>
      </form>
    </section>
  );
}
