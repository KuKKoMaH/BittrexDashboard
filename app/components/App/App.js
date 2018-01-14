import React from 'react';
import { loadBalances, loadMarketSummaries, loadOpenOrders } from '../../redux/actions';
import { connect } from 'react-redux';
import Balances from '../Balances';
import Total from '../Total';
import Reload from '../Reload/Reload';
import style from './App.styl';
import Header from '../Header/Header';
import Login from '../Login/Login';

class App extends React.Component {
  constructor( props ) {
    super(props);
  }

  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch(loadBalances());
    // dispatch(loadOpenOrders());
    // dispatch(loadMarketSummaries());
  }

  renderLogin() {
    return <Login />;
  }

  renderApp() {
    return (
      <React.Fragment>
        {/*<Header />*/}
        <Total />
        <Balances />
        <Reload />
      </React.Fragment>
    );
  }

  render() {
    const { apiKey, apiSecret } = this.props;
    return (
      <div className={style.app}>
        {!apiKey || !apiSecret ? this.renderLogin() : this.renderApp()}
      </div>
    );
  }
}

const mapStateToProps = ( state ) => ({
  apiKey:    state.apiKey,
  apiSecret: state.apiSecret,
});
export default connect(mapStateToProps)(App);