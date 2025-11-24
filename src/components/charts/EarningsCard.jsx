import React from "react";
import Chart from "react-apexcharts";
import { FaDollarSign } from "react-icons/fa";

const EarningsCard = () => {
  const chartOptions = {
    chart: {
      type: "area",
      sparkline: { enabled: true }, // removes axes, grid, etc.
    },
    stroke: { curve: "smooth", width: 2, colors: ["#3B82F6"] },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0, stops: [0, 100] },
    },
    tooltip: { enabled: false },
  };

  const chartSeries = [
    { data: [10, 20, 15, 25, 18, 30, 22, 28, 20] },
  ];

  return (
    <div className="bg-white rounded-md shadow p-5 w-full h-[250px]">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-gray-600 font-medium">Monthly Earnings</h3>
          <h2 className="text-2xl font-bold mt-1">$670</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="flex items-center text-green-500 text-sm font-medium">
              ↑ 14.68%
            </span>
            <span className="text-gray-500 text-sm">last month</span>
          </div>
        </div>

        {/* Icon */}
        <div className="bg-blue-100 p-3 rounded-full">
          <FaDollarSign className="text-blue-500 text-lg" />
        </div>
      </div>

      {/* Sparkline Chart */}
      <Chart options={chartOptions} series={chartSeries} type="area" height={80} />
    </div>
  );
};

export default EarningsCard;
