import React from "react";
import { AdminForm } from "../../components/common/AdminForm";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const CategoryAdd = () => {
  const { setLoading } = useAuthContext();
  const navigate = useNavigate();

  const categoryFormFields = () => [
    { label: "Category", name: "name", type: "text", required: true },
  ];

  const datafetch = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post("your_create_category_api", data); 
    } catch (e) {
      console.log("Error", e);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (data) => {
    datafetch(data);
    toast.success("Category Added Successfully");
    navigate('/categories')
  };

  return (
    <AdminForm
      title="Category Add"
      fields={categoryFormFields()}
      onSubmit={handleFormSubmit}
    />
  );
};
