import React from 'react';
import { loadBalances, loadMarketSummaries, loadOpenOrders } from '../../redux/actions';
import { connect } from 'react-redux';
import Balances from '../Balances/Balances';
import Total from '../Total/Total';
import Reload from '../Reload/Reload';
import LogoutButton from '../LogoutButton/LogoutButton';
import style from './Header.styl';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={style.wrapper}>
        <Reload />
        <div className={style.content}>
          <Total />
        </div>
        <LogoutButton />
      </div>
    );
  }
}

export default connect()(Header);