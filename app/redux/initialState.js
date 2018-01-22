import parseJson from "../helpers/parseJson";

const migrateKeys = () => {
  const { apiKey, apiSecret } = localStorage;
  if (apiKey && apiSecret) {
    localStorage.bittrexKey = apiKey;
    localStorage.bittrexSecret = apiSecret;
    delete localStorage.apiKey;
    delete localStorage.apiSecret;
  }
};

export default () => {
  migrateKeys();
  const bittrexKey = localStorage.bittrexKey;
  const ordersHistory = parseJson(localStorage[`${bittrexKey}-ordersHistory`]);
  return {
    bittrexKey,
    bittrexSecret: localStorage.bittrexSecret,
    binanceKey:    localStorage.binanceKey,
    binanceSecret: localStorage.binanceSecret,
    ordersHistory,
  };
}