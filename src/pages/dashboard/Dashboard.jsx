import React from "react";
import { ShoppingCart, Users, Package, BarChart } from "lucide-react";
import RevenueForecast from "../../components/charts/RevenueForecast";
import EarningsCard from "../../components/charts/EarningsCard";
import RevenueSources from "../../components/charts/RevenueSources";
// import { DataTable } from "../../components/common/DataTable";

// ---------------- Dashboard ----------------
export const Dashboard = () => {
  // Stats data (reusable via array)
  const stats = [
    {
      id: 1,
      label: "Product Solds",
      sublabel: "Number of items sold",
      value: "1,245",
      icon: ShoppingCart,
      color: "text-blue-500",
      bg: "bg-blue-200",
    },
    {
      id: 2,
      label: "Total Customers",
      sublabel: "Customers acquired",
      value: "4,310",
      icon: Users,
      color: "text-green-500",
      bg: "bg-green-200",
    },
    {
      id: 3,
      label: "Monthly Sales",
      sublabel: "Sales generated",
      value: "856",
      icon: Package,
      color: "text-orange-500",
      bg: "bg-orange-200",
    },
    {
      id: 4,
      label: "Total Sales",
      sublabel: "Cumulative sales revenue",
      value: "$12,430",
      icon: BarChart,
      color: "text-purple-500",
      bg: "bg-purple-200",
    },
  ];



  return (
      <main className=" flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white p-4 shadow rounded-xl flex items-center gap-6"
            >
              <div
                className={`w-10 h-10 p-2.5 flex justify-center items-center rounded-full ${stat.bg}`}
              >
                <stat.icon className={`${stat.color}`} />
              </div>
              <div>
                <p className="text-md text-gray-800 font-bold">{stat.label}</p>
                <p className="text-sm text-gray-500">{stat.sublabel}</p>
                <h2 className="text-md text-gray-800 font-bold mt-3">
                  {stat.value}
                </h2>
              </div>
            </div>
          ))}
        </div>
        {/* Section 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Left big chart */}
          <div className="md:col-span-2">
            <RevenueForecast /> {/* your main big chart */}
          </div>

          {/* Right side stacked */}
          <div className="flex flex-col gap-6">
            <EarningsCard />
            <RevenueSources />
          </div>
        </div>
        {/* Section 3 */}
        <div className="grid grid-cols-1 mb-6">
          {/* <DataTable /> */}
        </div>
      </main>
  );
};
