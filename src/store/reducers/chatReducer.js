import { ADD_USER_MESSAGE, ADD_AI_MESSAGE, SET_LOADING, SET_ERROR, CLEAR_ERROR, CLEAR_CHAT } from '../actions/chatActions';

const initialState = { messages: [], isLoading: false, error: null };

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER_MESSAGE:
    case ADD_AI_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_ERROR:
      return { ...state, error: null };
    case CLEAR_CHAT:
      return { ...initialState };
    default:
      return state;
  }
}
