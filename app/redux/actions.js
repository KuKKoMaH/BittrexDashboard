import * as API from '../API';
import { AUTH, LOGOUT, SELECT_CURRENCY, SET_API_RESPONSE } from './constants';

export const auth = ( { bittrexKey, bittrexSecret, binanceKey, binanceSecret, } ) => ({
  type: AUTH,
  bittrexKey,
  bittrexSecret,
  binanceKey,
  binanceSecret,
});

export const logout = () => ({
  type: LOGOUT,
});

export const selectCurrency = ( currency ) => ({
  type: SELECT_CURRENCY,
  currency,
});

export const setApiResponse = ( key, response ) => ({
  type: SET_API_RESPONSE,
  key,
  response,
});

const loadBittrex = ( path, params, key ) => ( dispatch, getState ) => API.bittrex(path, params, null, getState)
  .then(response => dispatch(setApiResponse(key, response)));

const loadBittrexV2 = ( path, params, key ) => ( dispatch ) => API.bittrexV2(path, params)
  .then(response => dispatch(setApiResponse(key, response)));

const loadBinance = ( path, params, options, key ) => ( dispatch, getState ) => API.binance(path, params, options, getState)
  .then(response => dispatch(setApiResponse(key, response)));

export const loadBalances = () => loadBittrex('account/getbalances', null, 'balances');
export const loadOpenOrders = () => loadBittrex('market/getopenorders', null, 'orders');
export const loadOrdersHistory = () => loadBittrex('account/getorderhistory', null, 'ordersHistory');
export const loadMarketSummaries = () => loadBittrex('public/getmarketsummaries', null, 'summaries');
export const loadMarkets = () => loadBittrex('public/getmarkets', null, 'markets');
export const loadBTCPrice = () => loadBittrexV2('pub/currencies/GetBTCPrice', null, 'BTCPrice');

export const loadBinanceBalances = () => loadBinance('v3/account', null, null, 'binanceBalances');