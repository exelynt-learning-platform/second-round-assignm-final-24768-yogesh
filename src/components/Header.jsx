import React from 'react';

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);

export default function Header({ onClear, messageCount }) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo-ring">✦</div>
        <div className="header-info">
          <h1>ChatBox AI</h1>
          <div className="online-badge">Online · OpenRouter</div>
        </div>
      </div>
      <div className="header-right">
        <span className="model-chip">mistral-7b-free</span>
        {messageCount > 0 && (
          <button className="btn-icon" onClick={onClear} title="Clear chat" aria-label="Clear chat">
            <TrashIcon />
          </button>
        )}
      </div>
    </header>
  );
}
