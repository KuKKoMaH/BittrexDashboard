import React from 'react';
import PropTypes from 'prop-types';
import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { CrossHairCursor, MouseCoordinateY, MouseCoordinateX, EdgeIndicator, CurrentCoordinate, PriceCoordinate } from "react-stockcharts/lib/coordinates";
import { scaleTime } from "d3-scale";
import { utcDay } from "d3-time";
import { dateToStr } from '../../helpers/date';
import { format } from "d3-format";

class Timeline extends React.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape()),
  };

  constructor( props ) {
    super(props);
  }

  render() {
    const { width, ratio } = this.props;
    if (!this.props.data) return null;

    const [min, max] = this.props.data.reduce(( current, i ) => {
      if (!current) return [i.low, i.high];
      if (i.low < current[0]) current[0] = i.low;
      if (i.high > current[1]) current[1] = i.high;
      return current;
    }, null);

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);
    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor,
    } = xScaleProvider(this.props.data);

    const xExtents = [
      xAccessor(last(data)),
      xAccessor(data[data.length - 50])
      // xAccessor(data[0])
    ];

    return <ChartCanvas
      height={400}
      ratio={ratio}
      width={width}
      margin={{ left: 10, right: 80, top: 10, bottom: 20 }}
      type="hybrid"
      seriesName="MSFT"
      data={data}
      xAccessor={xAccessor}
      displayXAccessor={displayXAccessor}
      xScale={xScale}
      xExtents={xExtents}
    >
      {/*<Chart id={1} yExtents={d => [d.high, d.low]}>*/}
      <Chart id={1} yExtents={d => [max, min]}>
        <XAxis
          axisAt="bottom"
          orient="bottom"
          ticks={10}
          innerTickSize={-1 * 400}
          tickStrokeDasharray='Solid'
          tickStrokeOpacity={0.1}
          tickStrokeWidth={1}
          // tickFormat={(value,a) => console.log(value, a)}
        />
        <YAxis
          axisAt="right"
          orient="right"
          ticks={10}
          innerTickSize={-1 * width}
          tickStrokeDasharray='Solid'
          tickStrokeOpacity={0.1}
          tickStrokeWidth={1}
          tickFormat={value => value.toFixed(8)}
        />
        <CandlestickSeries />

        <MouseCoordinateX
          at="bottom"
          orient="bottom"
          displayFormat={dateToStr} />
        <MouseCoordinateY
          at="right"
          orient="right"
          displayFormat={( val ) => val.toFixed(8)} />

        <CurrentCoordinate yAccessor={d => d.volume} fill="#9B0A47" />

        <PriceCoordinate
          at="right"
          orient="right"
          price={0.05}
          displayFormat={format(".2f")} />

        {/*<EdgeIndicator*/}
          {/*itemType="last"*/}
          {/*orient="right"*/}
          {/*edgeAt="right"*/}
          {/*yAccessor={d => d.close}*/}
          {/*fill={d => d.close > d.open ? "#6BA583" : "#FF0000"}*/}
        {/*/>*/}

      </Chart>
      <CrossHairCursor />
    </ChartCanvas>;
  }
}

export default fitWidth(Timeline);