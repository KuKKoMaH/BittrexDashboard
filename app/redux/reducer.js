import { AUTH, LOGOUT, SELECT_CURRENCY, SET_API_RESPONSE } from './constants';

const reducer = {
  [AUTH]: (state, { apiKey, apiSecret }) => ({
    ...state,
    apiKey,
    apiSecret,
  }),

  [LOGOUT]: (state) => ({
    ...state,
    bittrexKey:    state.bittrexKey,
    bittrexSecret: state.bittrexSecret,
    binanceKey:    state.binanceKey,
    binanceSecret: state.binanceSecret,
  }),

  [SELECT_CURRENCY]: (state, { currency }) => ({
    ...state,
    currency,
  }),

  [SET_API_RESPONSE]: (state, { key, response }) => ({
    ...state,
    [key]: response,
  }),
};

export default (state, action) => {
  if (reducer[action.type]) return reducer[action.type](state, action);
  return state;
};
