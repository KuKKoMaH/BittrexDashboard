import arraysUnion from "../helpers/arraysUnion";
import { AUTH, LOGOUT, SELECT_CURRENCY, SET_API_RESPONSE, ADD_ORDERS_HISTORY } from './constants';

const reducer = {
  [AUTH]: ( state, { apiKey, apiSecret } ) => ({
    ...state,
    apiKey,
    apiSecret,
  }),

  [LOGOUT]: ( state ) => ({
    ...state,
    bittrexKey:    state.bittrexKey,
    bittrexSecret: state.bittrexSecret,
    binanceKey:    state.binanceKey,
    binanceSecret: state.binanceSecret,
  }),

  [SELECT_CURRENCY]: ( state, { currency } ) => ({
    ...state,
    currency,
  }),

  [SET_API_RESPONSE]: ( state, { key, response } ) => ({
    ...state,
    [key]: response,
  }),

  [ADD_ORDERS_HISTORY]: ( state, { orders } ) => {
    const ordersHistory = arraysUnion(( el1, el2 ) => el1.id === el2.id, orders, state.ordersHistory)
      .sort(( el1, el2 ) => el2.closed - el1.closed);
    return {
      ...state,
      ordersHistory
    };
  },
};

export default ( state, action ) => {
  if (reducer[action.type]) return reducer[action.type](state, action);
  return state;
};
