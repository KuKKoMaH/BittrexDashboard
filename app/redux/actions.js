import API from '../API';
import { SET_BALANCES, SET_MARKET_SUMMARIES, SET_OPEN_ORDERS } from './constants';

export const loadBalances = () => (dispatch) => API('account/getbalances').then((balances) => dispatch({
  type: SET_BALANCES,
  balances,
}));

export const loadOpenOrders = () => (dispatch) => API('market/getopenorders').then((orders) => dispatch({
  type: SET_OPEN_ORDERS,
  orders,
}));

export const loadMarketSummaries = () => (dispatch) => API('public/getmarketsummaries').then((summaries) => dispatch({
  type: SET_MARKET_SUMMARIES,
  summaries,
}));