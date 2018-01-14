import { AUTH, SET_API_RESPONSE } from "./constants";

const initialState = {
  apiKey:    localStorage.apiKey,
  apiSecret: localStorage.apiSecret,
};

const reducer = {
  [AUTH]: ( state, { apiKey, apiSecret } ) => ({
    ...state,
    apiKey,
    apiSecret,
  }),

  [SET_API_RESPONSE]: ( state, { key, response } ) => ({
    ...state,
    [key]: response,
  }),
};

export default ( state = initialState, action ) => {
  if (reducer[action.type]) return reducer[action.type](state, action);
  return state;
};
