import API from '../API';
import { AUTH, SET_API_RESPONSE } from './constants';

export const auth = (apiKey, apiSecret) => ({
  type: AUTH,
  apiKey,
  apiSecret,
});

export const loadAPI = (path, params, key) => (dispatch, getState) => API(path, params, getState).then((response) => dispatch({
  type: SET_API_RESPONSE,
  key,
  response,
}));

export const loadBalances = () => loadAPI('account/getbalances', null, 'balances');
export const loadOpenOrders = () => loadAPI('market/getopenorders', null, 'orders');
export const loadOrdersHistory = () => loadAPI('account/getorderhistory', null, 'ordersHistory');
export const loadMarketSummaries = () => loadAPI('public/getmarketsummaries', null, 'summaries');
export const loadMarkets = () => loadAPI('public/getmarkets', null, 'markets');
