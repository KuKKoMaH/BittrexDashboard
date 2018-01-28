import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import styles from './Orders.styl';
import { selectCurrency } from '../../redux/actions';
import { dateToStr } from '../../helpers/date';
import UploadOrdersHistory from '../UploadOrdersHistory/UploadOrdersHistory';

class Orders extends React.PureComponent {
  static propTypes = {
    currency:      PropTypes.string,
    ordersHistory: PropTypes.arrayOf(PropTypes.shape({
      id:         PropTypes.string,
      created:    PropTypes.object,
      closed:     PropTypes.object,
      type:       PropTypes.string,
      market:     PropTypes.string,
      commission: PropTypes.number,
      limit:      PropTypes.number,
      price:      PropTypes.number,
      quantity:   PropTypes.number,
    })),
  };

  constructor( props ) {
    super(props);

    this.onClearCurrency = this.onClearCurrency.bind(this);
  }

  onClearCurrency() {
    this.props.dispatch(selectCurrency(null));
  }

  renderList() {
    const { ordersHistory, currency } = this.props;
    if (!ordersHistory) return null;
    const orders = currency ? ordersHistory.filter(o => o.market.includes(currency)) : ordersHistory;
    return (
      <table className={styles.table}>
        <thead>
        <tr>
          <th>#</th>
          <th>Open date</th>
          <th>Closed date</th>
          <th>Market</th>
          <th className={styles.text_right}>
            Cost
            <div className={styles.small}>Quantity * Price per unit</div>
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {orders.map(( order, i ) => (
          <tr key={order.id}>
            <td className={styles.index}>{i + 1}</td>
            <td className={styles.date}>{dateToStr(order.created)}</td>
            <td className={styles.date}>{dateToStr(order.closed)}</td>
            <td>
              <a href={`https://bittrex.com/Market/Index?MarketName=${order.market}`} target='_blank'>
                {order.market}
              </a>
            </td>
            <td className={styles.currency}>
              {(order.price + order.commission).toFixed(8)}
              <div className={styles.small}>{order.quantity.toFixed(8)} * {order.limit.toFixed(8)}</div>
            </td>
            <td className={styles.type}>
              {order.type === 'LIMIT_BUY'
                ? <i className={`fa fa-download ${styles.buy}`} title={order.type} />
                : <i className={`fa fa-upload ${styles.sell}`} title={order.type} />
              }
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    );
  }

  render() {
    const { currency } = this.props;
    return (
      <div>
        <h2>
          Orders history
          <UploadOrdersHistory />
        </h2>
        {currency && (
          <div>
            Selected currency: {currency}
            <button onClick={this.onClearCurrency}>clear</button>
          </div>
        )}
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = ( state ) => ({
  ordersHistory: state.ordersHistory,
});
export default connect(mapStateToProps)(Orders);
