import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AdminForm } from "../../components/common/AdminForm";
import toast from "react-hot-toast";

export const CategoryEdit = () => {
  const [category, setCategory] = useState({});
  const { setLoading } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const categoryFormFields = () => [
    {
      label: "Category",
      name: "name",
      type: "text",
      value: category.name || "",
      required: true,
    },
  ];

  useEffect(() => {
    const dataFetch = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`your_categories-api/${id}`);
        setCategory(res.data.category);
      } catch (e) {
        console.log("Error", e);
        toast.error("Failed to load category");
      } finally {
        setLoading(false);
      }
    };

    dataFetch();
  }, [id, setLoading]);

  const updateData = async (data) => {
    try {
      setLoading(true);
      const res = await axios.put(`your_update_category_api/${id}`, data);
      setCategory(res.data.category);
      return true;
    } catch (e) {
      console.log("Error", e);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (data) => {
    const success = await updateData(data);
    if (success) {
      toast.success("Category updated successfully");
      navigate("/categories");
    } else {
      toast.error("Error updating category");
    }
  };

  return (
    <AdminForm
      title="Category Edit"
      fields={categoryFormFields()}
      onSubmit={handleFormSubmit}
    />
  );
};
