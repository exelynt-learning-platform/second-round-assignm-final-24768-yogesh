import { v4 as uuidv4 } from 'uuid';

export const ADD_USER_MESSAGE = 'chat/ADD_USER_MESSAGE';
export const ADD_AI_MESSAGE = 'chat/ADD_AI_MESSAGE';
export const SET_LOADING = 'chat/SET_LOADING';
export const SET_ERROR = 'chat/SET_ERROR';
export const CLEAR_ERROR = 'chat/CLEAR_ERROR';
export const CLEAR_CHAT = 'chat/CLEAR_CHAT';

export const addUserMessage = (content) => ({
  type: ADD_USER_MESSAGE,
  payload: { id: uuidv4(), role: 'user', content, timestamp: new Date().toISOString() },
});
export const addAIMessage = (content) => ({
  type: ADD_AI_MESSAGE,
  payload: { id: uuidv4(), role: 'assistant', content, timestamp: new Date().toISOString() },
});
export const setLoading = (v) => ({ type: SET_LOADING, payload: v });
export const setError = (msg) => ({ type: SET_ERROR, payload: msg });
export const clearError = () => ({ type: CLEAR_ERROR });
export const clearChat = () => ({ type: CLEAR_CHAT });

export const sendMessage = (userInput) => async (dispatch, getState) => {
  const text = userInput.trim();
  if (!text) return;
  dispatch(clearError());
  dispatch(addUserMessage(text));
  dispatch(setLoading(true));
  try {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
      throw new Error('OpenRouter API key missing. Add VITE_OPENROUTER_API_KEY to your .env file.');
    }
    const { messages } = getState().chat;
    const history = messages.map(({ role, content }) => ({ role, content }));
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'ChatBox AI',
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: history,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.log("ERROR RESPONSE:", text);
      throw new Error(`HTTP ${res.status}`);
    }


    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content;
    if (!reply) throw new Error('Empty response from AI.');
    dispatch(addAIMessage(reply));
  } catch (e) {
    dispatch(setError(e.message || 'Something went wrong.'));
  } finally {
    dispatch(setLoading(false));
  }
};
