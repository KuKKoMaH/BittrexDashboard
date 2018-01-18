import React from 'react';
import { connect } from 'react-redux';
import Total from '../Total/Total';
import Reload from '../Reload/Reload';
import Profile from '../Profile/Profile';
import BTCValue from '../BTCValue/BTCValue';
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
          <BTCValue />
        </div>
        <Profile />
      </div>
    );
  }
}

export default connect()(Header);