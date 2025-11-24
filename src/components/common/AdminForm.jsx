import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {dummyFields} from "../../utils/dummyFields";

// important note: when use AdminForm component, make sure remove 'dummyFields' prop below and replace with [];

// const adminFormFields = () => [
//     { label: "Name", name: "name", type: "text", required: true },
//     { label: "Username", name: "username", type: "text", required: true },
//     { label: "Email", name: "email", type: "email", required: true },
//     { label: "Password", name: "password", type: "password", required: true },
//     { label: "Price", name: "price", type: "number" },
//     { label: "Quantity", name: "quantity", type: "number" },
//     {
//       label: "Role",
//       name: "role",
//       type: "select",
//       options: ["Admin", "Manager", "Staff"],
//     },
//     {
//       label: "Gender",
//       name: "gender",
//       type: "radio",
//       options: ["Male", "Female"],
//     },
//     { label: "Active", name: "active", type: "checkbox" },
//     { label: "Description", name: "description", type: "textarea" },
//     { label: "Upload Image", name: "image", type: "file" },
//     { label: "Date", name: "date", type: "date" },
//     { label: "Time", name: "time", type: "time" },
//     { label: "Agree to Terms", name: "agree", type: "checkbox" },
// ];

export const AdminForm = ({ title = "Admin Form", fields = dummyFields, onSubmit }) => {
  const navigate = useNavigate();

  const buildInitialData = (fields) =>
    fields.reduce((acc, field) => {
      acc[field.name] =
        field.type === "checkbox"
          ? field.value ?? false
          : field.type === "file"
          ? null
          : field.value ?? "";
      return acc;
    }, {});

  const [formData, setFormData] = useState(buildInitialData(fields));

  useEffect(() => {
    setFormData(buildInitialData(fields));
  }, [fields]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white shadow rounded-md p-6 space-y-6"
      >
        <h2 className="text-2xl font-bold text-indigo-500">{title}</h2>

        {fields.map((field, i) => (
          <div key={`${field.name}-${i}`}>
            {field.type !== "checkbox" && field.type !== "radio" && (
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
            )}

            {/* Render Inputs */}
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                rows="3"
                className="ps-3 mt-1 block w-full rounded-sm border border-gray-200 focus:border-indigo-500 text-gray-700 py-1 outline-none"
              />
            ) : field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="ps-3 mt-1 block w-full rounded-sm border border-gray-200 focus:border-indigo-500 text-gray-700 py-1 outline-none"
              >
                <option value="">Select {field.label}</option>
                {field.options.map((opt, i) => (
                  <option key={`${field.name}-${i}`} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : field.type === "radio" ? (
              <div className="mt-1 flex gap-4">
                {field.options.map((opt, i) => (
                  <label
                    key={`${field.name}-${i}`}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="radio"
                      name={field.name}
                      value={opt.toLowerCase()}
                      checked={formData[field.name] === opt.toLowerCase()}
                      onChange={handleChange}
                      className="accent-indigo-500"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            ) : field.type === "checkbox" ? (
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name={field.name}
                  checked={formData[field.name]}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-500 rounded accent-indigo-500"
                />
                <span>{field.label}</span>
              </label>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={field.type === "file" ? undefined : formData[field.name]}
                onChange={handleChange}
                className={`ps-3 mt-1 block w-full rounded-sm ${
                  field.type === "file"
                    ? "border-0"
                    : "border border-gray-200 focus:border-indigo-500"
                } text-gray-700 py-1 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-500 hover:file:bg-indigo-100`}
                required={field.required}
              />
            )}
          </div>
        ))}

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
