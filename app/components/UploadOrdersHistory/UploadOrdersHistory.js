import React from 'react';
import { connect } from 'react-redux';
import { convertUSADate } from "../../helpers/date";
import { addOrdersHistory } from "../../redux/actions";
import styles from './UploadOrdersHistory.styl';

class UploadOrdersHistory extends React.PureComponent {
  constructor( props ) {
    super(props);

    this.onSelectFile = this.onSelectFile.bind(this);
  }

  onSelectFile() {
    const file = this.input.files[0];
    if (!file) return;

    // 0         1        2    3        4     5              6     7      8
    // OrderUuid,Exchange,Type,Quantity,Limit,CommissionPaid,Price,Opened,Closed

    const reader = new FileReader();
    reader.onload = ( event ) => {
      const csv = event.target.result;
      const rawOrders = csv.replace(/\u0000/g, '').split('\n');
      rawOrders.shift();
      const orders = [];
      rawOrders.forEach(rawOrder => {
        const order = rawOrder.split(',');
        if (order.length !== 9) return;
        orders.push({
          id:         order[0],
          created:    new Date(order[7]),
          closed:     new Date(order[8]),
          type:       order[2],
          market:     order[1],
          commission: +order[5],
          limit:      +order[4],
          price:      +order[6],
          quantity:   +order[3]
        });
      });
      this.props.dispatch(addOrdersHistory(orders));
    };
    reader.readAsText(file);
  }

  render() {
    return (
      <div className={styles.button}>
        <input
          className={styles.input}
          type="file"
          onChange={this.onSelectFile}
          ref={( c ) => (this.input = c)}
        />
        Upload history file
      </div>
    );
  }
}

const mapStateToProps = ( state ) => ({});
export default connect(mapStateToProps)(UploadOrdersHistory);
