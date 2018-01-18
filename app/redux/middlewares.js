import { AUTH, LOGOUT } from './constants';

export const saveAuth = store => next => action => {
  if (action.type === AUTH) {
    const keys = ['bittrexKey', 'bittrexSecret', 'binanceKey', 'binanceSecret',];
    keys.forEach((key) => {
      localStorage[key] = action[key];
    });
  }
  if (action.type === LOGOUT) {
    delete localStorage.apiKey;
    delete localStorage.apiSecret;
  }
  return next(action);
};