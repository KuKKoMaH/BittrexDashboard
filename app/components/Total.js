import React from 'react';
import { connect } from 'react-redux';

class Total extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      totalBTC: 0,
      totalUSD: 0,
    };
  }

  componentDidMount() {
    this.updateBalances(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateBalances(nextProps);
  }

  updateBalances(props) {
    const { balances, marketSummaries } = props;
    if (!balances || !marketSummaries) return;
    let totalBTC = 0;
    balances.forEach((balance) => {
      if (!balance.Balance) return;
      const marketName = `BTC-${balance.Currency}`;
      const marketSummary = marketSummaries.find(market => market.MarketName === marketName);
      totalBTC += marketSummary ? marketSummary.Last * balance.Balance : balance.Balance;
    });
    const USDTtoBTC = marketSummaries.find(m => m.MarketName === 'USDT-BTC');
    console.log(totalBTC, USDTtoBTC, totalBTC * USDTtoBTC.Last);
    this.setState({ totalBTC, totalUSD: totalBTC * USDTtoBTC.Last });
  }

  render() {
    return (
      <div className="jumbotron">
        <h1>{this.state.totalBTC.toFixed(8)} BTC </h1>
        <h2>{this.state.totalUSD.toFixed(2)} USD </h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  balances:        state.balances,
  marketSummaries: state.marketSummaries,
});
export default connect(mapStateToProps)(Total);