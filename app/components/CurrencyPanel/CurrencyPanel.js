import React from 'react';
import PropTypes from 'prop-types';
import { bittrexV2 } from "../../API";
import Timeline from '../Timeline/Timeline';
import styles from './CurrencyPanel.styl';

export default class CurrencyPanel extends React.PureComponent {
  static propTypes = {
    currency: PropTypes.string,
  };

  constructor( props ) {
    super(props);

    this.state = {
      timeline: null,
    };
  }

  componentWillMount() {
    this.loadTimeline(this.props.currency);
  }

  componentWillReceiveProps( nextProps ) {
    this.loadTimeline(nextProps.currency);
  }

  loadTimeline( currency ) {
    bittrexV2('pub/market/GetTicks', {
      marketName:   `BTC-${currency}`,
      tickInterval: 'day' //day hour oneMin fiveMin thirtyMin
    }).then(( response ) => {
      const timeline = response.map(( i ) => ({
        date:     new Date(i.T),
        open:     i.O,
        high:     i.H,
        low:      i.D,
        close:    i.C,
        volume:   i.BV,
        split:    '',
        dividend: '',
      }));
      this.setState({ timeline });
    });
  }

  render() {
    return (
      <div className={styles.app}>
        <Timeline data={this.state.timeline} />
      </div>
    );
  }
}
