// dummyFields.js

export const dummyFields = [
  { label: "Name", name: "name", type: "text", required: true, value: "John Doe" },
  { label: "Username", name: "username", type: "text", required: true, value: "johnd" },
  { label: "Email", name: "email", type: "email", required: true, value: "john@gmail.com" },
  { label: "Password", name: "password", type: "password", required: true, value: "123456" },

  { label: "Price", name: "price", type: "number", value: 999 },
  { label: "Quantity", name: "quantity", type: "number", value: 5 },

  {
    label: "Role",
    name: "role",
    type: "select",
    options: [
      { label: "Admin", value: "admin" },
      { label: "Manager", value: "manager" },
      { label: "Staff", value: "staff" }
    ],
    value: "manager"
  },

  {
    label: "Gender",
    name: "gender",
    type: "radio",
    options: ["Male", "Female"],
    value: "male"
  },

  { label: "Active", name: "active", type: "checkbox", value: true },

  { label: "Description", name: "description", type: "textarea", value: "Demo description..." },

  { label: "Upload Image", name: "image", type: "file" },

  { label: "Date", name: "date", type: "date", value: "2025-11-24" },

  { label: "Time", name: "time", type: "time", value: "10:30" },

  { label: "Agree to Terms", name: "agree", type: "checkbox", value: true }
];

// Dummy Table Data
export const dummyUsers = [
  {
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    status: "Active",
    role: "Admin",
  },
  {
    _id: "2",
    name: "Sarah Smith",
    email: "sarah@example.com",
    phone: "9876500000",
    status: "Inactive",
    role: "Manager",
  },
  {
    _id: "3",
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "9999988888",
    status: "Pending",
    role: "Staff",
  },
];
