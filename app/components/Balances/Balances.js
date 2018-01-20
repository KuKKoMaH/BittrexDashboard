import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import styles from './Balances.styl';
import { selectCurrency } from '../../redux/actions';

class Balances extends React.PureComponent {
  static propTypes = {
    balances: PropTypes.arrayOf(PropTypes.shape({
      logo:       PropTypes.string,
      marketName: PropTypes.string,
      currency:   PropTypes.string,
      balance:    PropTypes.number,
      available:  PropTypes.number,
      pending:    PropTypes.number,
      reserved:   PropTypes.number,
      btcValue:   PropTypes.number,
      change:     PropTypes.number,
    })),
  };

  onSelectCurrency( currency ) {
    this.props.dispatch(selectCurrency(currency));
  }

  renderChange( balance ) {
    let className = 'fa ';
    if (balance.change) className += 'fa-long-arrow-' + (balance.change > 0 ? 'up ' + styles.up
      : 'down ' + styles.down);
    else className += 'fa-arrows-v';
    return (
      <Fragment>
        {balance.change.toFixed(2)}%&nbsp;
        <i className={className} />
      </Fragment>
    );
  }

  render() {
    const total = null;
    // const { total } = this.state;
    const { currency, balances } = this.props;
    if (!balances) return null;

    return (
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead>
          <tr>
            <th className={styles.index}>#</th>
            <th></th>
            <th className={styles.name}>Currency</th>
            <th className={styles.currency}>
              Balance
              <div className={styles.small}>available&nbsp;/&nbsp;pending&nbsp;/&nbsp;reserved</div>
            </th>
            <th className={styles.currency}>
              BTC value
              <div className={styles.small}>% of total&nbsp;/&nbsp;24h change</div>
            </th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {balances.map(( balance, i ) => (
            <tr
              key={balance.currency}
              onClick={() => this.onSelectCurrency(balance.currency)}
              className={classnames(styles.row, currency === balance.currency && styles.selected)}
            >
              <td className={styles.index}>{i + 1}</td>
              <td className={styles.logo}>
                {balance.logo && <img src={balance.logo} alt={balance.currency} className={styles.logoImg} />}
              </td>
              <td className={styles.name}>{balance.currency}</td>
              <td className={classnames(styles.currency)}>
                <div>{balance.balance.toFixed(8)}</div>
                <div className={styles.small}>
                  {balance.available.toFixed(8)}
                  &nbsp;/&nbsp;
                  {balance.pending.toFixed(8)}
                  &nbsp;/&nbsp;
                  {balance.reserved.toFixed(8)}
                </div>
              </td>
              <td className={styles.currency}>
                {balance.btcValue.toFixed(8)}
                <div className={styles.small}>
                    <span
                      className={styles.percent}>{total && ((balance.btcValue / total * 100).toFixed(2) + '%')}</span>
                  &nbsp;/&nbsp;
                  <span className={styles.change}>{this.renderChange(balance)}</span>
                </div>
              </td>
              <td className={styles.buttons}>
                <a
                  href={`https://bittrex.com/Market/Index?MarketName=${balance.marketName}`}
                  className={styles.button}
                  target="_blank"
                >
                  <i className="fa fa-external-link" />
                </a>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ( state ) => ({
});
export default connect(mapStateToProps)(Balances);
