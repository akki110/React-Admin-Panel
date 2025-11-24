import React, { useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { LuTrash } from "react-icons/lu";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

{/* <DataTable
  title="Contact List"
  data={list}
  addTitle="Add Contact"
  addLink="/add-contact"
  columns={contactsColumns}
  filterOptions={["Last"]}
  statusColors={{}}
  showFilter={true}
  showSearch={true}
  actions={["edit", "delete"]}
  editLink={(row) => `/contacts/edit/${row._id}`}
  onDeleteConfirm={(row) => console.log("Delete confirmed:", row)}
/>; */}

export const DataTable = ({
  title,
  data = [],
  addLink,
  addTitle,
  columns = [],
  filterOptions = [],
  statusColors = {},
  filterKey = "status",
  showFilter = false,
  showSearch = false,
  actions = [], // ["edit", "delete"]
  editLink = () => "#", // generate edit link
  onDeleteConfirm = () => {}, // delete handler
}) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState(null);

  const rowsPerPage = 10;

  // Filter + search
  const filteredData = data.filter((item) => {
    const matchesFilter = showFilter
      ? selectedFilter === "All" ||
        item[filterKey]?.toString().toLowerCase() ===
          selectedFilter.toLowerCase()
      : true;

    const matchesSearch =
      showSearch && search.trim() !== ""
        ? columns.some((col) =>
            (item[col.key]?.toString().toLowerCase() || "").includes(
              search.toLowerCase()
            )
          )
        : true;

    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-indigo-600 font-semibold">{title}</h2>
        {addLink && addTitle && (
          <>
            <Link
              to={addLink}
              className="bg-indigo-500 text-white px-3 py-1 rounded-sm hover:bg-indigo-600"
            >
              {addTitle}
            </Link>
          </>
        )}
      </div>

      {(showFilter || showSearch) && (
        <div className="flex justify-between items-center mb-4">
          {/* Filter */}
          {showFilter && filterOptions.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="border border-indigo-500 text-indigo-500 px-4 py-2 rounded-sm flex items-center gap-2"
              >
                <FaFilter /> {selectedFilter}
              </button>
              {filterOpen && (
                <div className="absolute mt-2 bg-white shadow-lg rounded-lg w-40 z-10">
                  <button
                    className={`w-full text-left px-4 py-2 ${
                      selectedFilter === "All"
                        ? "bg-indigo-50 text-indigo-600 font-medium"
                        : "text-gray-700"
                    }`}
                    onClick={() => {
                      setSelectedFilter("All");
                      setFilterOpen(false);
                      setPage(1);
                    }}
                  >
                    All
                  </button>
                  {filterOptions.map((status, i) => (
                    <button
                      key={i}
                      className={`w-full text-left px-4 py-2 ${
                        selectedFilter === status
                          ? "bg-indigo-50 text-indigo-600 font-medium"
                          : "text-gray-700"
                      }`}
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
          )}

          {/* Search */}
          {showSearch && (
            <div className="flex items-center border border-indigo-500 rounded-md px-2">
              <FaSearch className="text-indigo-400 mr-2" />
              <input
                type="text"
                placeholder="Search here..."
                className="outline-none py-1"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="w-full overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="py-2">Id</th>
              {columns.map((col) => (
                <th key={col.key} className="py-2">
                  {col.label}
                </th>
              ))}
              {actions.length > 0 && <th className="py-2">Action</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{(page - 1) * rowsPerPage + index + 1}</td>
                {columns.map((col) => (
                  <td key={col.key} className="py-2">
                    {col.key === filterKey && statusColors[item[col.key]] ? (
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          statusColors[item[col.key]]
                        }`}
                      >
                        {item[col.key]}
                      </span>
                    ) : col.render ? (
                      col.render(item[col.key], item)
                    ) : (
                      item[col.key]
                    )}
                  </td>
                ))}
                {actions.length > 0 && (
                  <td className="py-2 flex gap-2">
                    {actions.includes("edit") && (
                      <>
                        <Link
                          to={editLink(item)}
                          className="flex justify-center items-center w-8 h-8 rounded-sm bg-indigo-50 text-indigo-500 cursor-pointer"
                          data-tooltip-id="edit-tooltip"
                        >
                          <GoPencil />
                        </Link>
                        <Tooltip
                          id="edit-tooltip"
                          place="bottom"
                          content="Edit"
                          className="!bg-indigo-400 !px-2 !py-1 !text-[12px] !text-base"
                        />
                      </>
                    )}
                    {actions.includes("delete") && (
                      <button
                        onClick={() => setDeleteModal(item)}
                        className="flex justify-center items-center w-8 h-8 rounded-sm bg-red-50 text-red-500 cursor-pointer"
                        data-tooltip-id="delete-tooltip"
                      >
                        <LuTrash />
                        <Tooltip
                          id="delete-tooltip"
                          place="bottom"
                          content="Delete"
                          className="!bg-indigo-400 !px-2 !py-1 !text-[12px] !text-base"
                        />
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (actions.length > 0 ? 2 : 1)}
                  className="py-4 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 mt-4">
        <button
          className={`px-3 py-1 border border-indigo-500 text-indigo-500 rounded disabled:opacity-50 disabled:cursor-not-allowed`}
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 border border-indigo-500 rounded ${
              page === i + 1
                ? "bg-indigo-500 text-white"
                : "text-indigo-500 cursor-pointer"
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className={`px-3 py-1 border border-indigo-500 text-indigo-500 rounded disabled:opacity-50 disabled:cursor-not-allowed`}
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/10 flex items-start justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-[500px] mt-10">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium">
                {deleteModal.name || "this item"}
              </span>
              ?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 cursor-pointer"
                onClick={() => setDeleteModal(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-500 text-white cursor-pointer"
                onClick={() => {
                  onDeleteConfirm(deleteModal);
                  setDeleteModal(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
