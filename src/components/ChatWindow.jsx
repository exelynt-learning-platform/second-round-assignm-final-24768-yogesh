import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import LoadingDots from './LoadingDots';

const SUGGESTIONS = [
  '💡 Explain quantum computing simply',
  '✍️ Write a short poem about the sea',
  '🔧 Debug my JavaScript code',
  '📚 Summarise a topic I choose',
];

export default function ChatWindow({ messages, isLoading, onSuggestion }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <main className="messages-area" aria-live="polite">
      {messages.length === 0 && !isLoading ? (
        <div className="empty-state">
          <div className="empty-orb">✦</div>
          <h2>Ask me anything</h2>
          <p>Your AI assistant powered by OpenRouter — totally free to use.</p>
          <div className="suggestion-chips">
            {SUGGESTIONS.map((s) => (
              <button key={s} className="chip" onClick={() => onSuggestion(s.slice(3))}>
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {messages.map((m) => <MessageBubble key={m.id} message={m} />)}
          {isLoading && <LoadingDots />}
        </>
      )}
      <div ref={bottomRef} />
    </main>
  );
}
