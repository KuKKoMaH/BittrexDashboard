import hmacSHA512 from 'crypto-js/hmac-sha512';
import stringify from 'qs/lib/stringify';
import config from './config';

/**
 *
 * @param {String} url
 * @param {Object} [params]
 * @return {Promise.<Object|Array.<*>>}
 */
export default ( url, params = {} ) => {
  const nonce = new Date().getTime();
  const fullParams = {
    ...params,
    apikey: config.API_KEY,
    nonce,
  };
  const fullUrl = config.API_URL + url + `?${stringify(fullParams)}`;
  const apisign = hmacSHA512(fullUrl, config.API_SECRET);
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