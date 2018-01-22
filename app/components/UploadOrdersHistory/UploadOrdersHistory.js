import React from 'react';
import Para from 'papaparse';
import { connect } from 'react-redux';
import { setOrdersHistory } from "../../redux/actions";
import styles from './UploadOrdersHistory.styl';

class UploadOrdersHistory extends React.PureComponent {
  constructor( props ) {
    super(props);

    this.onSelectFile = this.onSelectFile.bind(this);
  }

  onSelectFile() {
    const file = this.input.files[0];
    if (!file) return;

    Para.parse(file, {
      delimiter: ',',
      newline:   '\n',
      header:    true,
      complete:  ( result ) => {
        const orders = result.data;
        this.props.dispatch(setOrdersHistory(orders));
      },
    })
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
