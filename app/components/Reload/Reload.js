import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { loadBalances, loadMarketSummaries, loadOpenOrders } from '../../redux/actions';
import styles from './Reload.styl';

class Reload extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { loading: false };

    this.onReload = this.onReload.bind(this);
  }

  onReload() {
    if (this.state.loading) return;
    this.setState({ loading: true });
    const { dispatch } = this.props;
    Promise.all([
      dispatch(loadBalances()),
      // dispatch(loadOpenOrders()),
      dispatch(loadMarketSummaries()),
    ]).then(() => this.setState({ loading: false }));
  }

  render() {
    const { loading } = this.state;

    return (
      <button onClick={this.onReload} className={classnames(styles.button, loading && styles.active)}>
        <i className={classnames('fa fa-refresh', loading && 'fa-spin')} />
      </button>
    );
  }
}

export default connect()(Reload);
