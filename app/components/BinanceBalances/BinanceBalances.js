import React, { Fragment } from 'react';
import classnames from 'classnames';
import Balances from '../Balances/Balances'
import { connect } from 'react-redux';

class BinanceBalances extends React.PureComponent {
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
    const { binanceBalances } = props;
    if (!binanceBalances) return;

    const balances = binanceBalances.balances
      .filter(balance => +balance.free)
      .map(( balance ) => {
        const marketName = `BTC-${balance.asset}`;

        return {
          logo:       null,
          marketName: marketName,
          currency:   balance.asset,
          balance:    +balance.free + +balance.locked,
          available:  +balance.free,
          pending:    0,
          reserved:   +balance.locked,
          btcValue:   0,
          change:     0,
        };
      });

    this.setState({ balances });
  }

  render() {
    const { balances } = this.state;
    if (!balances) return null;
    console.log(balances);
    return (
      <div>
        <h2>Binance balances</h2>
        <Balances balances={balances} />
      </div>
    );
  }
}

const mapStateToProps = ( state ) => ({
  binanceBalances: state.binanceBalances,
});
export default connect(mapStateToProps)(BinanceBalances);
