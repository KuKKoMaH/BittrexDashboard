import { AUTH, LOGOUT, SET_ORDERS_HISTORY } from './constants';

export const saveAuth = store => next => action => {
  if (action.type === AUTH) {
    const keys = ['bittrexKey', 'bittrexSecret', 'binanceKey', 'binanceSecret',];
    keys.forEach(( key ) => {
      localStorage[key] = action[key];
    });
  }
  if (action.type === LOGOUT) {
    delete localStorage.apiKey;
    delete localStorage.apiSecret;
  }
  return next(action);
};

export const saveOrdersHistory = store => next => action => {
  next(action);

  if (action.type === SET_ORDERS_HISTORY) {
    const { bittrexKey, ordersHistory } = store.getState();
    const key = `${bittrexKey}-ordersHistory`;
    if (ordersHistory) {
      localStorage[key] = JSON.stringify(ordersHistory);
    } else {
      delete localStorage[key];
    }
  }
};
