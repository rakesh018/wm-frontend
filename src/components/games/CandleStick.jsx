import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

export const CandleStick = ({ candleArray }) => {
  const [seriesData, setSeriesData] = useState([]);

  useEffect(() => {
    if (candleArray && candleArray.length > 0) {
      const newSeriesData = candleArray.map((candle) => {
        return {
          x: new Date(candle.x).getTime(), // Convert x to a timestamp
          y: candle.y, // y is already an array of [open, high, low, close]
        };
      });

      setSeriesData(newSeriesData);
    }
  }, [candleArray]);

  const options = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    plotOptions: {
      candlestick: {
        wick: {
          useFillColor: true,
        },
      },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        formatter: (value) => Math.round(value), // Ensure y-axis labels are integers
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={[{ data: seriesData }]}
        type="candlestick"
        height={300}
      />
    </div>
  );
};
