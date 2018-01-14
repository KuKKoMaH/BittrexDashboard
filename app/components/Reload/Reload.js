import React from 'react';
import { connect } from 'react-redux';
import { loadBalances, loadMarketSummaries, loadOpenOrders } from '../../redux/actions';

class Reload extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { loading: false };

    this.onReload = this.onReload.bind(this);
  }

  onReload() {
    this.setState({ loading: true });
    const { dispatch } = this.props;
    Promise.all([
      dispatch(loadBalances()),
      // dispatch(loadOpenOrders()),
      dispatch(loadMarketSummaries()),
    ]).then(() => this.setState({ loading: false }));
  }

  render() {
    if (this.state.loading) return null;
    return <button onClick={this.onReload}>reload</button>;
  }
}

export default connect()(Reload);
