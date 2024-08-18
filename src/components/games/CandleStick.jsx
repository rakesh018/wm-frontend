import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

export const CandleStick = ({ candleArray = [] }) => {
  const [seriesData, setSeriesData] = useState([]);

  useEffect(() => {
    // Initialize the first candle values
    let previousClose = 100;

    const newSeriesData = candleArray.map((value, index) => {
      const open = previousClose;
      const high =
        value === 1 ? open + Math.random() * 10 : open - Math.random() * 2;
      const low =
        value === 1 ? open - Math.random() * 2 : open - Math.random() * 10;
      const close =
        value === 1 ? open + Math.random() * 5 : open - Math.random() * 5;

      previousClose = close; // Update previousClose for next candle

      return {
        x: new Date().getTime() + index * 60000, // Increment by one minute
        y: [open, high, low, close],
      };
    });

    setSeriesData(newSeriesData);
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
