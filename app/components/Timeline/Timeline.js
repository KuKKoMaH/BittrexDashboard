import React from 'react';
import { connect } from 'react-redux';
import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { scaleTime } from "d3-scale";
import { utcDay } from "d3-time";

import { bittrexV2 } from "../../API";

class Timeline extends React.PureComponent {
  constructor( props ) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentWillReceiveProps( nextProps ) {
    if (nextProps.currency) {
      bittrexV2('pub/market/GetTicks', {
        marketName:   'BTC-SC',
        tickInterval: 'day'
      }).then(response => this.setState({
        data: response.map(( i ) => ({
          date:     new Date(i.T),
          open:     i.O,
          high:     i.H,
          low:      i.D,
          close:    i.C,
          volume:   i.BV,
          split:    '',
          dividend: '',
        })),
      }));
    }
  }

  render() {
    const { width, ratio, currency } = this.props;
    const { data } = this.state;
    if (!data || !currency) return null;

    const xAccessor = d => d.date;
    const xExtents = [
      xAccessor(last(data)),
      xAccessor(data[data.length - 100])
    ];

    return <ChartCanvas
      height={400}
      ratio={ratio}
      width={width}
      margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
      type="hybrid"
      seriesName="MSFT"
      data={data}
      xAccessor={xAccessor}
      xScale={scaleTime()}
      xExtents={xExtents}
    >
      <Chart id={1} yExtents={d => [d.high, d.low]}>
        <XAxis axisAt="bottom" orient="bottom" ticks={6} />
        <YAxis axisAt="left" orient="left" ticks={5} />
        <CandlestickSeries width={timeIntervalBarWidth(utcDay)} />
      </Chart>
    </ChartCanvas>;
  }
}

const mapStateToProps = ( state ) => ({
  currency: state.currency,
});
export default fitWidth(connect(mapStateToProps)(Timeline));