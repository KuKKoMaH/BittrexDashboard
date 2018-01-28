import PropTypes from "prop-types";
import React from "react";

import Highcharts from 'highcharts/highcharts';
import stock from 'highcharts/modules/stock';

stock(Highcharts);
console.log(Highcharts);

export default class Chart extends React.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      date:  PropTypes.instanceOf(Date),
      open:  PropTypes.number,
      high:  PropTypes.number,
      low:   PropTypes.number,
      close: PropTypes.number,

    })),
  };

  componentDidMount() {
    this.chart = Highcharts.stockChart(this.element, {
      rangeSelector: {
        selected: 1
      },
      series:        [{
        type: 'candlestick',
        data: convertData(this.props.data),
      }]
    });
    window.chart = this.chart;
  }

  componentWillReceiveProps( nextProps ) {
    this.chart.series[0].setData(convertData(nextProps.data));
  }

  componentWillUnmount() {
    if (this.chart) this.chart.destroy();
  }

  render() {
    return <div ref={( el ) => this.element = el} />;
  }
}

const convertData = ( data ) => {
  return data.map(item => ([
    item.date.getTime(),
    item.open,
    item.high,
    item.low,
    item.close,
  ]))
};