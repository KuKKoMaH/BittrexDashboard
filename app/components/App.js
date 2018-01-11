import React from 'react';
import { loadBalances, loadMarketSummaries, loadOpenOrders } from '../redux/actions';
import { connect } from 'react-redux';
import Balances from './Balances';
import Total from './Total';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadBalances());
    dispatch(loadOpenOrders());
    dispatch(loadMarketSummaries());
  }

  render() {
    return (
      <div>
        <Total />
        <Balances />
      </div>
    );
  }
}

export default connect()(App);