import React from 'react';
import styles from './Dashboard.styl';
import { loadBalances, loadMarketSummaries, loadOpenOrders, loadMarkets, loadOrdersHistory } from '../../redux/actions';

import Balances from '../Balances/Balances';
import Reload from '../Reload/Reload';
import Orders from '../Orders/Orders';
import Header from '../Header/Header';
import { connect } from 'react-redux';

class Dashboard extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadBalances());
    dispatch(loadOpenOrders());
    dispatch(loadMarketSummaries());
    dispatch(loadMarkets());
    dispatch(loadOrdersHistory());
  }

  render() {
    return (
      <div className={styles.app}>
        <Header />
        <div className={styles.content}>
          <div className={styles.balances}><Balances /></div>
          <div className={styles.aside}><Orders /></div>
        </div>
      </div>
    );
  }
}

export default connect()(Dashboard);