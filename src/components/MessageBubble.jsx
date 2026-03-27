import React from 'react';
import { formatTime } from '../utils/time';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`msg-row msg-row--${isUser ? 'user' : 'ai'}`}>
      <div className={`avatar avatar--${isUser ? 'user' : 'ai'}`}>
        {isUser ? 'You' : '✦'}
      </div>
      <div className="bubble-wrap">
        <div className={`bubble bubble--${isUser ? 'user' : 'ai'}`}>
          {message.content}
        </div>
        <span className="bubble-time">{formatTime(message.timestamp)}</span>
      </div>
    </div>
  );
}
