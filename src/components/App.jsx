import React from 'react';
import Header from './Header';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import ErrorBanner from './ErrorBanner';
import useChat from '../hooks/useChat';

export default function App() {
  const { messages, isLoading, error, handleSend, handleClear, handleClearError } = useChat();

  return (
    <div className="app-shell">
      <div className="chat-card">
        <Header onClear={handleClear} messageCount={messages.length} />
        {error && <ErrorBanner message={error} onDismiss={handleClearError} />}
        <ChatWindow messages={messages} isLoading={isLoading} onSuggestion={handleSend} />
        <MessageInput onSend={handleSend} isLoading={isLoading} />
      </div>
    </div>
  );
}
