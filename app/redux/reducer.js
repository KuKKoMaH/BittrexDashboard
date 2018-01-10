import { SET_BALANCES, SET_MARKET_SUMMARIES, SET_OPEN_ORDERS } from "./constants";

const reducer = {
  [SET_BALANCES]: ( state, action ) => ({
    ...state,
    balances: action.balances,
  }),

  [SET_OPEN_ORDERS]: ( state, action ) => ({
    ...state,
    openOrders: action.orders,
  }),

  [SET_MARKET_SUMMARIES]: ( state, action ) => ({
    ...state,
    marketSummaries: action.summaries,
  }),

};

export default ( state = [], action ) => {
  if (reducer[action.type]) return reducer[action.type](state, action);
  return state;
};
