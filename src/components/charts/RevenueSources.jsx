import React from "react";
import Chart from "react-apexcharts";

const RevenueSources = () => {
  const chartOptions = {
    chart: {
      type: "donut",
    },
    labels: ["Online", "Offline", "Affiliate"],
    legend: {
      position: "bottom",
      fontSize: "14px",
    },
    colors: ["#4f46e5", "#22c55e", "#f97316"],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
    stroke: {
      show: false,
    },
  };

  const chartSeries = [55, 30, 15]; // % values

  return (
    <div className="bg-white rounded-xl shadow p-4 h-[250px]">
      <div className="flex items-center justify-between mb-3">
        <h5 className="font-semibold text-gray-800">Revenue Sources</h5>
      </div>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="donut"
        height={200}
      />
    </div>
  );
};

export default RevenueSources;
