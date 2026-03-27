import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { sendMessage, clearChat, clearError } from '../store/actions/chatActions';

export default function useChat() {
  const dispatch   = useDispatch();
  const messages   = useSelector((s) => s.chat.messages);
  const isLoading  = useSelector((s) => s.chat.isLoading);
  const error      = useSelector((s) => s.chat.error);
  const handleSend       = useCallback((t) => dispatch(sendMessage(t)), [dispatch]);
  const handleClear      = useCallback(() => dispatch(clearChat()), [dispatch]);
  const handleClearError = useCallback(() => dispatch(clearError()), [dispatch]);
  return { messages, isLoading, error, handleSend, handleClear, handleClearError };
}
