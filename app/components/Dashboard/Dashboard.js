import React from 'react';
import { connect } from 'react-redux';
import {
  loadBalances,
  loadMarketSummaries,
  loadOpenOrders,
  loadMarkets,
  loadOrdersHistory,
  loadBTCPrice
} from '../../redux/actions';
import Balances from '../Balances/Balances';
import Orders from '../Orders/Orders';
import Header from '../Header/Header';
import Timeline from '../Timeline/Timeline';
import styles from './Dashboard.styl';

class Dashboard extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadBalances());
    dispatch(loadOpenOrders());
    dispatch(loadMarketSummaries());
    dispatch(loadMarkets());
    dispatch(loadOrdersHistory());
    dispatch(loadBTCPrice());
  }

  render() {
    return (
      <div className={styles.app}>
        <Header />
        <div className={styles.content}>
          <div className={styles.balances}><Balances /></div>
          <div className={styles.aside}>
            <Timeline />
            <Orders />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Dashboard);