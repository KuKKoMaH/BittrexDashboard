import React, { Fragment } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import styles from './Balances.styl';
import { selectCurrency } from '../../redux/actions';

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
    const { openOrders, balances, marketSummaries, markets } = props;
    if (!balances) return;
    const availableBalances = balances
      // .filter(balance => balance.Balance)
      .map((balance) => {
        const marketName = `BTC-${balance.Currency}`;
        const marketSummary = marketSummaries && marketSummaries.find(market => market.MarketName === marketName);
        const btcValue = marketSummary ? marketSummary.Last * balance.Balance : marketSummaries ? balance.Balance : 0;
        const market = markets && markets.find(market => market.MarketName === marketName);
        const reserved = openOrders ? openOrders.reduce((sum, order) => {
          if (balance.Currency === 'BTC' && order.Exchange.indexOf(balance.Currency) === 0 && order.OrderType === 'LIMIT_BUY')
            return sum + order.QuantityRemaining * order.Limit;
          if (order.Exchange === marketName && order.OrderType === 'LIMIT_SELL') return sum + order.QuantityRemaining;
          return sum;
        }, 0) : 0;
        return {
          logo:       market && market.LogoUrl,
          marketName: market && marketName,
          currency:   balance.Currency,
          balance:    balance.Balance,
          available:  balance.Available,
          pending:    balance.Pending,
          reserved,
          btcValue,
          change:     marketSummary ? (marketSummary.PrevDay / marketSummary.Last * 100 - 100) * -1 : 0,
        };
      })
      .sort((a, b) => b.btcValue - a.btcValue);
    const total = marketSummaries ? availableBalances.reduce((sum, b) => sum + b.btcValue, 0) : 0;
    this.setState({ balances: availableBalances, total });
  }

  onSelectCurrency(currency) {
    this.props.dispatch(selectCurrency(currency));
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

  render() {
    const { balances, total } = this.state;
    const { currency } = this.props;
    if (!balances) return null;

    return (
      <div className={styles.wrapper}>
        <h2>Account balances</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.index}>#</th>
              <th></th>
              <th className={styles.name}>Currency</th>
              <th className={styles.currency}>
                Balance
                <div className={styles.small}>available&nbsp;/&nbsp;pending&nbsp;/&nbsp;reserved</div>
              </th>
              <th className={styles.currency}>
                BTC value
                <div className={styles.small}>% of total&nbsp;/&nbsp;24h change</div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {balances.map((balance, i) => (
              <tr
                key={balance.currency}
                onClick={() => this.onSelectCurrency(balance.currency)}
                className={classnames(styles.row, currency === balance.currency && styles.selected)}
              >
                <td className={styles.index}>{i + 1}</td>
                <td className={styles.logo}>
                  {balance.logo && <img src={balance.logo} alt={balance.currency} className={styles.logoImg} />}
                </td>
                <td className={styles.name}>{balance.currency}</td>
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
                <td className={styles.buttons}>
                  <a
                    href={`https://bittrex.com/Market/Index?MarketName=${balance.marketName}`}
                    className={styles.button}
                    target="_blank"
                  >
                    <i className="fa fa-external-link" />
                  </a>
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
  currency:        state.currency,
  balances:        state.balances,
  openOrders:      state.orders,
  marketSummaries: state.summaries,
  markets:         state.markets,
});
export default connect(mapStateToProps)(Balances);
