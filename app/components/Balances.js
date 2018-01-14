import React from 'react';
import { connect } from 'react-redux';

class Balances extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      balances: null,
    };
  }

  componentDidMount() {
    this.updateBalances(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateBalances(nextProps);
  }

  updateBalances(props) {
    const { openOrders, balances, marketSummaries } = props;
    if (!balances) return;
    const availableBalances = balances
      .filter(balance => balance.Balance)
      .map((balance) => {
        const marketName = `BTC-${balance.Currency}`;
        const marketSummary = marketSummaries && marketSummaries.find(market => market.MarketName === marketName);
        return ({
          currency:  balance.Currency,
          balance:   balance.Balance,
          available: balance.Available,
          pending:   balance.Pending,
          reserved:  openOrders && openOrders.find(order => order.Exchange === marketName && order.OrderType === 'LIMIT_SELL'),
          btcValue:  marketSummary ? marketSummary.Last * balance.Balance : balance.Balance,
        });
      })
      .sort((a, b) => b.btcValue - a.btcValue);
    this.setState({ balances: availableBalances });
  }

  render() {
    const { balances } = this.state;
    if (!balances) return null;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>currency</th>
            <th>balance</th>
            <th>available</th>
            <th>pending</th>
            <th>reserved</th>
            <th>BTC value</th>
          </tr>
        </thead>
        <tbody>
          {balances.map((balance, i) => (
            <tr key={balance.currency}>
              <td><b>{i + 1}</b></td>
              <td>{balance.currency}</td>
              <td>{balance.balance.toFixed(8)}</td>
              <td>{balance.available.toFixed(8)}</td>
              <td>{balance.pending.toFixed(8)}</td>
              <td>{balance.reserved && balance.reserved.QuantityRemaining.toFixed(8)}</td>
              <td>{balance.btcValue.toFixed(8)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  balances:        state.balances,
  openOrders:      state.orders,
  marketSummaries: state.summaries,
});
export default connect(mapStateToProps)(Balances);
