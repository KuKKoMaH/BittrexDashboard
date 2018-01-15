import React, { Fragment } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import styles from './Balances.styl';

class Balances extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      balances: null,
      total:    0,
    };
  }

  componentDidMount() {
    this.updateBalances(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateBalances(nextProps);
  }

  updateBalances(props) {
    const { openOrders, balances, marketSummaries, markets, ordersHistory } = props;
    if (!balances) return;
    const availableBalances = balances
      .filter(balance => balance.Balance)
      .map((balance) => {
        const marketName = `BTC-${balance.Currency}`;
        const marketSummary = marketSummaries && marketSummaries.find(market => market.MarketName === marketName);
        const btcValue = marketSummary ? marketSummary.Last * balance.Balance : marketSummaries ? balance.Balance : 0;
        const market = markets && markets.find(market => market.MarketName === marketName);
        const orders = openOrders && openOrders.filter(order => order.Exchange === marketName && order.OrderType === 'LIMIT_SELL');
        return {
          logo:       market && market.LogoUrl,
          marketName: market && marketName,
          currency:   balance.Currency,
          balance:    balance.Balance,
          available:  balance.Available,
          pending:    balance.Pending,
          reserved:   orders ? orders.reduce((sum, o) => sum + o.QuantityRemaining, 0) : 0,
          btcValue,
          change:     marketSummary ? (marketSummary.PrevDay / marketSummary.Last * 100 - 100) * -1 : 0,
        };
      })
      .sort((a, b) => b.btcValue - a.btcValue);
    const total = marketSummaries ? availableBalances.reduce((sum, b) => sum + b.btcValue, 0) : 0;
    this.setState({ balances: availableBalances, total });
  }

  renderChange(balance) {
    let className = 'fa ';
    if (balance.change) className += 'fa-long-arrow-' + (balance.change > 0 ? 'up ' + styles.up
      : 'down ' + styles.down);
    else className += 'fa-arrows-v';
    return (
      <Fragment>
        {balance.change.toFixed(2)}%&nbsp;
        <i className={className} />
      </Fragment>
    );
  }

  renderLink(balance, children) {
    if (!balance.marketName) return children;
    const link = `https://bittrex.com/Market/Index?MarketName=${balance.marketName}`;
    return <a href={link} target='_blank' className={styles.link}>{children}</a>;
  }

  render() {
    const { balances, total } = this.state;
    if (!balances) return null;
    return (
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.index}>#</th>
              <th></th>
              <th className={styles.title}>Currency</th>
              <th className={styles.currency}>
                Balance
                <div className={styles.small}>available&nbsp;/&nbsp;pending&nbsp;/&nbsp;reserved</div>
              </th>
              <th className={styles.currency}>
                BTC value
                <div className={styles.small}>% of total&nbsp;/&nbsp;24h change</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {balances.map((balance, i) => (
              <tr key={balance.currency}>
                <td className={styles.index}>{i + 1}</td>
                <td className={styles.logo}>
                  {this.renderLink(
                    balance,
                    balance.logo && <img src={balance.logo} alt={balance.currency} className={styles.logoImg} />
                  )}
                </td>
                <td className={styles.title}>{this.renderLink(balance, balance.currency)}</td>
                <td className={classnames(styles.currency)}>
                  <div>{balance.balance.toFixed(8)}</div>
                  <div className={styles.small}>
                    {balance.available.toFixed(8)}
                    &nbsp;/&nbsp;
                    {balance.pending.toFixed(8)}
                    &nbsp;/&nbsp;
                    {balance.reserved.toFixed(8)}
                  </div>
                </td>
                <td className={styles.currency}>
                  {balance.btcValue.toFixed(8)}
                  <div className={styles.small}>
                    <span
                      className={styles.percent}>{total && ((balance.btcValue / total * 100).toFixed(2) + '%')}</span>
                    &nbsp;/&nbsp;
                    <span className={styles.change}>{this.renderChange(balance)}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  balances:        state.balances,
  openOrders:      state.orders,
  marketSummaries: state.summaries,
  markets:         state.markets,
  ordersHistory:   state.ordersHistory,
});
export default connect(mapStateToProps)(Balances);
