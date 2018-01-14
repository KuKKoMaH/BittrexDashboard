import { AUTH } from "./constants";

export const saveAuth = store => next => action => {
  if (action.type === AUTH) {
    localStorage.apiKey = action.apiKey;
    localStorage.apiSecret = action.apiSecret;
  }
  return next(action);
};