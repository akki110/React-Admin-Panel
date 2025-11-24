import React, { useState } from "react";
import Chart from "react-apexcharts";
import { BsChevronDown } from "react-icons/bs";

const RevenueForecast = () => {
  const [period, setPeriod] = useState("week");
  const [isOpen, setIsOpen] = useState(false);

  // Example datasets for Week / Month / Year
  const datasets = {
    week: {
      positive: [1, 2.5, 1, 3.5, 2, 2.5, 2, 1.2, 2.3],
      negative: [-3, -1.2, -2.2, -1.5, -2.3, -2.1, -1, -2.3, -1.5],
    },
    month: {
      positive: [2, 3.5, 1.8, 2.9, 3.2, 2.8, 2.4, 2.7, 3],
      negative: [-2, -1.8, -2.5, -1.2, -2.6, -1.7, -2.1, -2.4, -1.9],
    },
    year: {
      positive: [3, 4.5, 2.5, 4, 3.8, 3.5, 4.2, 3.1, 4],
      negative: [-3, -2.5, -3.2, -2.8, -3.1, -2.9, -3.3, -2.6, -3],
    },
  };

  const options = {
    chart: { type: "bar", stacked: false, toolbar: { show: false } },
    plotOptions: { bar: { columnWidth: "30%", borderRadius: 5 } },
    colors: ["#6366F1", "#F43F5E"], // blue and pink
    dataLabels: { enabled: false },
    stroke: { show: false },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    yaxis: { min: -4, max: 4, tickAmount: 5 },
    legend: { position: "bottom" },
    grid: { borderColor: "#f1f1f1" },
  };

  const series = [
    { name: "Positive", data: datasets[period].positive },
    { name: "Negative", data: datasets[period].negative },
  ];

  const periodLabels = {
    week: "This Week",
    month: "This Month",
    year: "This Year",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow h-[520px]">
      <div className="flex justify-between items-center mb-4 relative">
        <h2 className="text-lg font-semibold">Revenue Forecast</h2>

        {/* Custom Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="border border-indigo-500 text-indigo-500 px-4 py-2 rounded-sm bg-white cursor-pointer focus:outline-none flex items-center justify-between gap-2 min-w-[130px]"
          >
            {periodLabels[period]}
            <span className="ml-2">
              <BsChevronDown />
            </span>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              {Object.entries(periodLabels).map(([key, label]) => (
                <div
                  key={key}
                  onClick={() => {
                    setPeriod(key);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2 cursor-pointer hover:bg-indigo-100 ${
                    period === key
                      ? "bg-indigo-50 text-indigo-600 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Chart options={options} series={series} type="bar" height={400} />
    </div>
  );
};

export default RevenueForecast;
