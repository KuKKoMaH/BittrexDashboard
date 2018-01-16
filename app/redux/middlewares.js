import { AUTH, LOGOUT } from './constants';

export const saveAuth = store => next => action => {
  if (action.type === AUTH) {
    localStorage.apiKey = action.apiKey;
    localStorage.apiSecret = action.apiSecret;
  }
  if(action.type === LOGOUT) {
    delete localStorage.apiKey;
    delete localStorage.apiSecret;
  }
  return next(action);
};