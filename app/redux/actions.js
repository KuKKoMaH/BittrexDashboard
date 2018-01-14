import API from '../API';
import { AUTH, SET_API_RESPONSE } from './constants';

export const auth = ( apiKey, apiSecret ) => ({
  type: AUTH,
  apiKey,
  apiSecret,
});

export const loadAPI = ( path, key ) => ( dispatch, getState ) => API(path, null, getState).then(( response ) => dispatch({
  type: SET_API_RESPONSE,
  key,
  response,
}));

export const loadBalances = () => loadAPI('account/getbalances', 'balances');
export const loadOpenOrders = () => loadAPI('market/getopenorders', 'orders');
export const loadMarketSummaries = () => loadAPI('public/getmarketsummaries', 'summaries');
