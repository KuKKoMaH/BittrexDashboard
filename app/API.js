import hmacSHA512 from 'crypto-js/hmac-sha512';
import stringify from 'qs/lib/stringify';
import config from './config';

/**
 *
 * @param {String} url
 * @param {Object} [params]
 * @param {Function} getState
 * @return {Promise.<Object|Array.<*>>}
 */
export default ( url, params = {}, getState ) => {
  const state = getState();
  const nonce = new Date().getTime();
  const fullParams = {
    ...params,
    apikey: state.apiKey,
    nonce,
  };
  const fullUrl = config.API_URL + url + `?${stringify(fullParams)}`;
  const apisign = hmacSHA512(fullUrl, state.apiSecret);
  const options = {
    headers: new Headers({
      apisign,
      'Accept':       '*/*',
      'content-type': 'application/x-www-form-urlencoded',
    }),
  };
  return fetch(config.PROXY_URL + fullUrl, options)
    .then(response => response.json())
    .then(response => response.result);
}