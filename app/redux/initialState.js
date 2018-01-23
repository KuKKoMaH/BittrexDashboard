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

const getOrdersHistory = () => {
  const ordersHistory = parseJson(localStorage[`${localStorage.bittrexKey}-ordersHistory`]);
  if (!ordersHistory) return null;
  return ordersHistory.map(order => ({
    ...order,
    created: new Date(order.created),
    closed:  new Date(order.closed),
  }));
};

export default () => {
  migrateKeys();
  return {
    bittrexKey:    localStorage.bittrexKey,
    bittrexSecret: localStorage.bittrexSecret,
    binanceKey:    localStorage.binanceKey,
    binanceSecret: localStorage.binanceSecret,
    ordersHistory: getOrdersHistory(),
  };
}