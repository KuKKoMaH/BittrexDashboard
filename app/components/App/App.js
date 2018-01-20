import React from 'react';
import { connect } from 'react-redux';
import {
  loadBalances,
  loadMarketSummaries,
  loadOpenOrders,
  loadMarkets,
  loadOrdersHistory,
  loadBTCPrice,
  loadBinanceBalances
} from '../../redux/actions';
import BittrexBalances from '../BittrexBalances/BittrexBalances';
import BinanceBalances from '../BinanceBalances/BinanceBalances';
import Orders from '../Orders/Orders';
import Header from '../Header/Header';
// import Timeline from '../Timeline/Timeline';
import styles from './App.styl';

class App extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadBTCPrice());
    dispatch(loadBalances());
    dispatch(loadOpenOrders());
    dispatch(loadMarketSummaries());
    dispatch(loadMarkets());
    dispatch(loadOrdersHistory());
    dispatch(loadBTCPrice());

    dispatch(loadBinanceBalances());
  }

  render() {
    return (
      <div className={styles.app}>
        <Header />
        <div className={styles.content}>
          <div className={styles.balances}>
            <BittrexBalances />
            <BinanceBalances />
          </div>
          <div className={styles.aside}>
            {/*<Timeline />*/}
            <Orders />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ( state ) => ({});
export default connect(mapStateToProps)(App);