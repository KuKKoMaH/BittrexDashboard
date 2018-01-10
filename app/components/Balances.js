import React from 'react';
import { connect } from 'react-redux';
import { loadBalances, loadMaketSUmmaries, loadOpenOrders } from "../redux/actions";

class Balances extends React.PureComponent {
  constructor( props ) {
    super(props);
    this.state = {
      balances: null,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadBalances());
    dispatch(loadOpenOrders());
    dispatch(loadMaketSUmmaries());
    this.updateBalances(this.props);
  }

  componentWillReceiveProps( nextProps ) {
    this.updateBalances(nextProps);
  }

  updateBalances( props ) {
    const { openOrders, balances } = props;
    if (!openOrders || !balances) return;
    const availableBalances = balances
      .filter(balance => balance.Balance)
      .map(( balance ) => ({
        currency:  balance.Currency,
        balance:   balance.Balance,
        available: balance.Available,
        pending:   balance.Pending,
        reserved:  openOrders.find(order => order.Exchange === `BTC-${balance.Currency}` && order.OrderType === 'LIMIT_SELL'),
      }));
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
        </tr>
        </thead>
        <tbody>
        {balances.map(( balance, i ) => (
          <tr key={balance.currency}>
            <td><b>{i + 1}</b></td>
            <td>{balance.currency}</td>
            <td>{balance.balance}</td>
            <td>{balance.available}</td>
            <td>{balance.pending}</td>
            <td>{balance.reserved && balance.reserved.QuantityRemaining}</td>
          </tr>
        ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ( state ) => ({
  balances:   state.balances,
  openOrders: state.openOrders,
});
export default connect(mapStateToProps)(Balances);
