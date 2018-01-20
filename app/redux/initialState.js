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
  return {
    bittrexKey:    localStorage.bittrexKey,
    bittrexSecret: localStorage.bittrexSecret,
    binanceKey:    localStorage.binanceKey,
    binanceSecret: localStorage.binanceSecret,
  };
}