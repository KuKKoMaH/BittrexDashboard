import React from 'react';
import API from '../API';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balances: null,
      orders:   null,
    };
  }

  componentDidMount() {
    // API('public/getmarketsummaries').then(console.log);
    // API('public/getmarketsummary', {market: 'BTC-1ST BTC-2GIVE'}).then(console.log);
    API('public/getorderbook', {market: 'BTC-1ST', type: 'both'}).then(console.log);
    API('market/getopenorders').then(({ result }) => this.setState({ orders: result }));
    return API('account/getbalances').then(({ result }) => {
      const balances = result.filter(balance => balance.Available || balance.Balance || balance.Pending);
      this.setState({ balances });
    });
  }

  renderBalances() {
    if (!this.state.balances) return;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Currency</th>
            <th>Balance</th>
            <th>Available</th>
            <th>Pending</th>
          </tr>
        </thead>
        <tbody>
          {this.state.balances.map((balance) => (
            <tr key={balance.Currency}>
              <td>{balance.Currency}</td>
              <td>{balance.Balance}</td>
              <td>{balance.Available}</td>
              <td>{balance.Pending}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  renderOrders() {
    if (!this.state.orders) return;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Exchange</th>
            <th>OrderType</th>
          </tr>
        </thead>
        <tbody>
          {this.state.orders.map((balance) => (
            <tr key={balance.OrderUuid}>
              <td>{balance.Exchange}</td>
              <td>{balance.OrderType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div className="container">
        {this.renderBalances()}
        {this.renderOrders()}
      </div>
    );
  }
}
