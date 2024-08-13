import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './CandleChart.css';


const candleArray = [1, 0, 1, 1, 0, 1, 0, 0, 1];
export const CandleChart = () => {
  
  const data = {
    labels: candleArray.map((_, index) => index + 1), // Labels for each candle
    datasets: [
      {
        label: 'Candles',
        data: candleArray.map(candle => (candle === 0 ? -1 : 1)), // Map 0 to -1 and 1 to 1 for vertical positioning
        backgroundColor: candleArray.map(candle => (candle === 0 ? 'red' : 'green')),
      },
    ],
  };
  const options = {
    indexAxis: 'x',
    scales: {
      y: {
        beginAtZero: true,
        min: -1.5,
        max: 1.5,
        ticks: {
          stepSize: 1,
          callback: function(value) {
            return value === -1 ? 'Down' : value === 1 ? 'Up' : '';
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="candle-chart-container">
      <h2></h2>
      <Bar data={data} options={options} />
     
    </div>
  )
}
