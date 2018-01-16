import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import styles from './Orders.styl';
import { selectCurrency } from '../../redux/actions';
import { convertDate } from '../../helpers/date';

class Orders extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onClearCurrency = this.onClearCurrency.bind(this);
  }

  onClearCurrency() {
    this.props.dispatch(selectCurrency(null));
  }

  render() {
    const { ordersHistory, currency } = this.props;
    if (!ordersHistory) return null;
    const orders = currency ? ordersHistory.filter(o => o.Exchange.includes(currency)) : ordersHistory;
    return (
      <div>
        <h2>Orders history</h2>
        {currency && (
          <div>
            Selected currency: {currency}
            <button onClick={this.onClearCurrency}>clear</button>
          </div>
        )}
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
            {orders.map((order, i) => (
              <tr key={order.OrderUuid}>
                <td className={styles.index}>{i + 1}</td>
                <td className={styles.date}>{convertDate(order.TimeStamp)}</td>
                <td className={styles.date}>{convertDate(order.Closed)}</td>
                <td>
                  <a href={`https://bittrex.com/Market/Index?MarketName=${order.Exchange}`} target='_blank'>
                    {order.Exchange}
                  </a>
                </td>
                <td className={styles.currency}>
                  {(order.Price + order.Commission).toFixed(8)}
                  <div className={styles.small}>{order.Quantity.toFixed(8)} * {order.PricePerUnit.toFixed(8)}</div>
                </td>
                <td className={styles.type}>
                  {order.OrderType === 'LIMIT_BUY'
                    ? <i className={`fa fa-download ${styles.buy}`} title={order.OrderType} />
                    : <i className={`fa fa-upload ${styles.sell}`} title={order.OrderType} />
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ordersHistory: state.ordersHistory,
  currency:      state.currency,
});
export default connect(mapStateToProps)(Orders);
