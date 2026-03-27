import React, { useState, useRef } from 'react';

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const MAX = 2000;

export default function MessageInput({ onSend, isLoading }) {
  const [val, setVal] = useState('');
  const taRef = useRef(null);

  const submit = () => {
    if (!val.trim() || isLoading) return;
    onSend(val.trim());
    setVal('');
    if (taRef.current) { taRef.current.style.height = 'auto'; }
  };

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); }
  };

  const onChange = (e) => {
    setVal(e.target.value);
    const t = taRef.current;
    if (t) { t.style.height = 'auto'; t.style.height = Math.min(t.scrollHeight, 140) + 'px'; }
  };

  const left = MAX - val.length;

  return (
    <div className="input-section">
      <div className="input-row">
        <textarea
          ref={taRef}
          className="msg-input"
          value={val}
          onChange={onChange}
          onKeyDown={onKey}
          placeholder="Message ChatBox AI…"
          disabled={isLoading}
          rows={1}
          maxLength={MAX}
          aria-label="Type your message"
        />
        <button
          className="send-btn"
          onClick={submit}
          disabled={isLoading || !val.trim() || left < 0}
          aria-label="Send message"
        >
          {isLoading ? <div className="spinner" /> : <SendIcon />}
        </button>
      </div>
      <div className="input-footer">
        <span className="input-hint">Enter to send · Shift+Enter for newline</span>
        <span className={`char-count${left < 100 ? ' over' : ''}`}>{left}</span>
      </div>
    </div>
  );
}
