import React from 'react';
import { loadBalances, loadMarketSummaries, loadOpenOrders } from '../../redux/actions';
import { connect } from 'react-redux';
import Balances from '../Balances';
import Total from '../Total';
import Reload from '../Reload/Reload';
import style from './Header.styl';

class Header extends React.Component {
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
      <div className={style.wrapper}>
        Hello
      </div>
    );
  }
}

export default connect()(Header);