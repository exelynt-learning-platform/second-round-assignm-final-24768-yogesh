import React from 'react';

export default function LoadingDots() {
  return (
    <div className="msg-row msg-row--ai" role="status" aria-label="AI is typing">
      <div className="avatar avatar--ai">✦</div>
      <div className="bubble-wrap">
        <div className="bubble bubble--ai bubble--loading">
          <span className="dot" /><span className="dot" /><span className="dot" />
        </div>
      </div>
    </div>
  );
}
