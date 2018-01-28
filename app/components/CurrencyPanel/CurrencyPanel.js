import React from 'react';
import PropTypes from 'prop-types';
import { bittrexV2 } from "../../API";
import Timeline from '../Timeline/Timeline';
import Orders from '../Orders/Orders';
import styles from './CurrencyPanel.styl';

export default class CurrencyPanel extends React.PureComponent {
  static propTypes = {
    currency: PropTypes.string,
  };

  constructor( props ) {
    super(props);

    this.state = {
      tickInterval: 'thirtyMin',
      timeline:     null,
    };

    this.onChangeTickInterval = this.onChangeTickInterval.bind(this);
    this.loadTimeline = this.loadTimeline.bind(this);
  }

  componentWillMount() {
    this.loadTimeline(this.props.currency);
  }

  componentWillReceiveProps( nextProps, nextState ) {
    this.loadTimeline(nextProps.currency);
  }

  onChangeTickInterval( e ) {
    this.setState({ tickInterval: e.target.value }, () => this.loadTimeline(this.props.currency));
  }

  loadTimeline( currency ) {

    bittrexV2('pub/market/GetTicks', {
      marketName:   `BTC-${currency}`,
      tickInterval: this.state.tickInterval,
    }).then(( response ) => {
      const timeline = response.map(( i ) => ({
        date:     new Date(i.T+'+0000'),
        open:     i.O,
        high:     i.H,
        low:      i.L,
        close:    i.C,
        // volume:   i.BV,
        // split:    '',
        // dividend: '',
      }));
      this.setState({ timeline });
    });
  }

  render() {
    return (
      <div className={styles.app}>
        <select value={this.state.tickInterval} onChange={this.onChangeTickInterval}>
          <option value="day">day</option>
          <option value="hour">hour</option>
          <option value="oneMin">oneMin</option>
          <option value="fiveMin">fiveMin</option>
          <option value="thirtyMin">thirtyMin</option>
        </select>
        <Timeline data={this.state.timeline} />
        <Orders currency={this.props.currency} />
      </div>
    );
  }
}
