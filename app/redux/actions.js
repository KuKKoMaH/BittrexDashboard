import * as API from '../API';
import { AUTH, LOGOUT, SELECT_CURRENCY, SET_API_RESPONSE, ADD_ORDERS_HISTORY } from './constants';

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

export const addOrdersHistory = ( orders ) => ({
  type: ADD_ORDERS_HISTORY,
  orders,
});

const loadBittrex = ( path, params, key ) => ( dispatch, getState ) => API.bittrex(path, params, null, getState)
  .then(response => dispatch(setApiResponse(key, response)));

const loadBittrexV2 = ( path, params, key ) => ( dispatch ) => API.bittrexV2(path, params)
  .then(response => dispatch(setApiResponse(key, response)));

const loadBinance = ( path, params, options, key ) => ( dispatch, getState ) => API.binance(path, params, options, getState)
  .then(response => dispatch(setApiResponse(key, response)));

export const loadBalances = () => loadBittrex('account/getbalances', null, 'balances');
export const loadOpenOrders = () => loadBittrex('market/getopenorders', null, 'orders');
export const loadMarketSummaries = () => loadBittrex('public/getmarketsummaries', null, 'summaries');
export const loadMarkets = () => loadBittrex('public/getmarkets', null, 'markets');
export const loadBTCPrice = () => loadBittrexV2('pub/currencies/GetBTCPrice', null, 'BTCPrice');

export const loadBinanceBalances = () => loadBinance('v3/account', null, null, 'binanceBalances');

export const loadOrdersHistory = () => ( dispatch, getState ) => {
  API.bittrex('account/getorderhistory', null, null, getState).then(( response ) => {
    const orders = response.map(order => ({
      id:         order.OrderUuid,
      created:    new Date(order.TimeStamp),
      closed:     new Date(order.Closed),
      type:       order.OrderType,
      market:     order.Exchange,
      commission: order.Commission,
      limit:      order.Limit,
      price:      order.Price,
      quantity:   order.Quantity
    }));
    dispatch(addOrdersHistory(orders));
  })
};
