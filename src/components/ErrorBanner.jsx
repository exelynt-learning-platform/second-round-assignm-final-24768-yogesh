import React from 'react';

export default function ErrorBanner({ message, onDismiss }) {
  return (
    <div className="error-banner" role="alert">
      <span>⚠️</span>
      <span className="error-banner__msg">{message}</span>
      <button className="error-banner__close" onClick={onDismiss} aria-label="Dismiss">✕</button>
    </div>
  );
}
