import hmacSHA512 from 'crypto-js/hmac-sha512';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import stringify from 'qs/lib/stringify';
import config from './config';

/**
 *
 * @param {String} url
 * @param {Object} [options]¬
 * @return {Promise<any>}
 */
const request = ( url, options ) => fetch(url, options).then(response => response.json());

/**
 *
 * @param {String} url
 * @param {Object} [params]
 * @param {Object} [options]
 * @param {Function} getState
 * @return {Promise.<Object|Array.<*>>}
 */
export const bittrex = ( url, params = {}, options, getState ) => {
  const state = getState();
  const nonce = new Date().getTime();
  const fullParams = {
    ...params,
    apikey: state.bittrexKey,
    nonce,
  };
  const fullUrl = config.BITTREX_API_URL + url + `?${stringify(fullParams)}`;
  const apisign = hmacSHA512(fullUrl, state.bittrexSecret);
  const fullOptions = {
    ...options,
    headers: new Headers({
      apisign,
      'Accept':       '*/*',
      'content-type': 'application/x-www-form-urlencoded',
    }),
  };
  return request(config.PROXY_URL + fullUrl, fullOptions).then(response => response.result);
};

export const bittrexV2 = ( url, params = {}, options ) => {
  const fullUrl = config.BITTREX_V2_API_URL + url + `?${stringify(params)}`;
  return request(config.PROXY_URL + fullUrl).then(response => response.result);
};

export const binance = ( url, params, options, getState ) => {
  const state = getState();
  const timestamp = new Date().getTime();
  const fullParams = { ...params, timestamp, };
  fullParams.signature = hmacSHA256(
    stringify(fullParams),
    state.binanceSecret,
  ).toString();
  const fullOptions = {
    ...options,
    headers: new Headers({
      'X-MBX-APIKEY': state.binanceKey,
    }),
  };

  const fullUrl = config.BINANCE_API_URL + url + `?${stringify(fullParams)}`;
  return request(config.PROXY_URL + fullUrl, fullOptions).then(response => response.result);
};
