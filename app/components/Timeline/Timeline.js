import React from 'react';
import PropTypes from 'prop-types';
import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { scaleTime } from "d3-scale";
import { utcDay } from "d3-time";

class Timeline extends React.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape()),
  };

  constructor( props ) {
    super(props);
  }

  render() {
    const { width, ratio, data } = this.props;
    if (!data) return null;

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

export default fitWidth(Timeline);