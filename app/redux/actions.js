import * as API from '../API';
import { AUTH, LOGOUT, SELECT_CURRENCY, SET_API_RESPONSE } from './constants';

export const auth = ( apiKey, apiSecret ) => ({
  type: AUTH,
  apiKey,
  apiSecret,
});

export const logout = () => ({
  type: LOGOUT,
});

export const selectCurrency = ( currency ) => ({
  type: SELECT_CURRENCY,
  currency,
});

export const loadAPI = ( fn, path, params, key ) => ( dispatch, getState ) => fn(path, params, getState)
  .then(( response ) => dispatch({
    type: SET_API_RESPONSE,
    key,
    response,
  }));

export const loadBalances = () => loadAPI(API.bittrex, 'account/getbalances', null, 'balances');
export const loadOpenOrders = () => loadAPI(API.bittrex, 'market/getopenorders', null, 'orders');
export const loadOrdersHistory = () => loadAPI(API.bittrex, 'account/getorderhistory', null, 'ordersHistory');
export const loadMarketSummaries = () => loadAPI(API.bittrex, 'public/getmarketsummaries', null, 'summaries');
export const loadMarkets = () => loadAPI(API.bittrex, 'public/getmarkets', null, 'markets');
export const loadBTCPrice = () => loadAPI(API.bittrexV2, 'pub/currencies/GetBTCPrice', null, 'BTCPrice');
