import React, { Fragment } from 'react';
import classnames from 'classnames';
import Balances from '../Balances/Balances'
import { connect } from 'react-redux';

class BittrexBalances extends React.PureComponent {
  constructor( props ) {
    super(props);
    this.state = {
      balances: null,
      total:    0,
    };
  }

  componentDidMount() {
    this.updateBalances(this.props);
  }

  componentWillReceiveProps( nextProps ) {
    this.updateBalances(nextProps);
  }

  updateBalances( props ) {
    const { openOrders, balances, marketSummaries, markets } = props;
    if (!balances) return;
    const availableBalances = balances
    .filter(balance => balance.Balance)
      .map(( balance ) => {
        const marketName = `BTC-${balance.Currency}`;
        const marketSummary = marketSummaries && marketSummaries.find(market => market.MarketName === marketName);
        const btcValue = marketSummary ? marketSummary.Last * balance.Balance : marketSummaries ? balance.Balance : 0;
        const market = markets && markets.find(market => market.MarketName === marketName);
        const reserved = openOrders ? openOrders.reduce(( sum, order ) => {
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
      .sort(( a, b ) => b.btcValue - a.btcValue);
    const total = marketSummaries ? availableBalances.reduce(( sum, b ) => sum + b.btcValue, 0) : 0;
    this.setState({ balances: availableBalances, total });
  }

  render() {
    const { balances, total } = this.state;
    const { currency } = this.props;
    if (!balances) return null;

    return (
      <div>
        <h2>Bittrex balances</h2>
        <Balances balances={balances} />
      </div>
    );
  }
}

const mapStateToProps = ( state ) => ({
  currency:        state.currency,
  balances:        state.balances,
  openOrders:      state.orders,
  marketSummaries: state.summaries,
  markets:         state.markets,
});
export default connect(mapStateToProps)(BittrexBalances);
