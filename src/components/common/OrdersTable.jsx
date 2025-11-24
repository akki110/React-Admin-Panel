import React, { useState } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import { FaFilter, FaSearch } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { LuTrash } from "react-icons/lu";

const ordersData = [
  {
    id: 1,
    product: "UltraSoft Premium Cooling Memory Foam Pillow Set",
    customer: "Mark Johnson",
    quantity: 2,
    status: "pending",
    price: 120.0,
  },
  {
    id: 2,
    product: "Solar powered desk lamp with sleek metallic finish",
    customer: "Jane Smith",
    quantity: 3,
    status: "shipped",
    price: 1120.0,
  },
  {
    id: 3,
    product: "Coffee maker with glass and wood finishes",
    customer: "Chris Miller",
    quantity: 1,
    status: "delivered",
    price: 45.0,
  },
  {
    id: 4,
    product: "Fully automatic washing machine with top load and front load",
    customer: "Lavoiosa Serin",
    quantity: 4,
    status: "shipped",
    price: 785.0,
  },
  {
    id: 5,
    product: "Portable Mini Projector",
    customer: "David Warner",
    quantity: 2,
    status: "pending",
    price: 350.0,
  },
  {
    id: 6,
    product: "Smart Wireless Earbuds",
    customer: "Sophia Lee",
    quantity: 1,
    status: "delivered",
    price: 90.0,
  },
];

const statusColors = {
  pending: "bg-red-200 text-red-700",
  shipped: "bg-yellow-200 text-yellow-700",
  delivered: "bg-green-200 text-green-700",
};

export const OrdersTable = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  const filteredOrders = ordersData.filter((order) => {
    const matchesFilter =
      selectedFilter === "All" ||
      order.status.toLowerCase() === selectedFilter.toLowerCase();
    const matchesSearch =
      order.product.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Total Orders</h2>

      {/* Filter + Search */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="border border-indigo-500 text-indigo-500 px-4 py-2 rounded-sm bg-white cursor-pointer focus:outline-none flex items-center justify-between gap-2 "
          >
            <FaFilter className="text-indigo-500" /> {selectedFilter}
          </button>
          {filterOpen && (
            <div className="absolute mt-2 bg-white shadow-lg rounded-lg w-40">
              {["All", "Shipped", "Pending", "Delivered"].map((status,i) => (
                <button
                  key={i}
                  className={`w-full text-left px-4 py-2 hover:bg-indigo-100
                   ${
                     selectedFilter == status
                       ? "bg-indigo-50 text-indigo-600 font-medium"
                       : "text-gray-700"
                   } 
                  `}
                  onClick={() => {
                    setSelectedFilter(status);
                    setFilterOpen(false);
                    setPage(1);
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center border border-indigo-500 text-indigo-500 rounded-md px-2">
          <FaSearch className="text-indigo-400 mr-2" />
          <input
            type="text"
            placeholder="Search order here..."
            className="outline-none py-1"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="w-12/12 overflow-auto">
        <table className="w-full border-collapse overflow-auto">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="py-2">Id</th>
              <th className="py-2">Product</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Status</th>
              <th className="py-2">Price</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="py-2">{order.id}</td>
                <td className="py-2">{order.product}</td>
                <td className="py-2 text-gray-500">{order.customer}</td>
                <td className="py-2">{order.quantity}</td>
                <td className="py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      statusColors[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-2">${order.price.toFixed(2)}</td>
                <td className="py-2 flex justify-start gap-2">
                  <button className="flex justify-center items-center text-[14px] shadow w-8 h-8 rounded-sm bg-indigo-50 text-indigo-500 gap-2 px-1 cursor-pointer">
                    <GoPencil />
                  </button>
                  <button className="flex justify-center items-center text-[14px] shadow w-8 h-8 rounded-sm bg-indigo-50 text-indigo-500 gap-2 px-1 cursor-pointer">
                    <LuTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 mt-4">
        <button
          className="px-3 py-1 border border-indigo-500 text-indigo-500 rounded disabled:opacity-50"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 border border-indigo-500 text-indigo-500 rounded ${
              page === i + 1 ? "bg-indigo-500 text-white" : ""
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 border border-indigo-500 text-indigo-500 rounded disabled:opacity-50"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
