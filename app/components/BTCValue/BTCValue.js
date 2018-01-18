import React from 'react';
import { connect } from 'react-redux';
import styles from './BTCValue.styl';

class BTCValue extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { BTCPrice } = this.props;
    if (!BTCPrice) return null;
    return (
      <div className={styles.wrapper}>1 BTC = ${BTCPrice.bpi.USD.rate}</div>
    );
  }
}

const mapStateToProps = (state) => ({
  BTCPrice: state.BTCPrice,
});
export default connect(mapStateToProps)(BTCValue);