import React from 'react';
import { connect } from 'react-redux';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import './App.styl';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { apiKey, apiSecret } = this.props;
    if (!apiKey || !apiSecret) return <Login />;
    return <Dashboard />;
  }
}

const mapStateToProps = (state) => ({
  apiKey:    state.apiKey,
  apiSecret: state.apiSecret,
});
export default connect(mapStateToProps)(App);