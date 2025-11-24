import React, { useEffect, useState } from "react";
import { AdminForm } from "../../components/common/AdminForm";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";

export const SubcategoryAdd = () => {
  const [fetchCategory, setFetchCategory] = useState([]);
  const navigate = useNavigate();
  const { setLoading } = useAuthContext();

  const subcategoryFormFields = () => [
    {
      label: "Category",
      name: "categoryName",
      type: "select",
      options: fetchCategory.map((cat) => ({
        label: cat.name,
        value: cat._id,
      })),
    },
    { label: "Subcategory", name: "name", type: "text", required: true },
  ];

  // Fetch Category
  useEffect(() => {
    const categoryFetch = async () => {
      try {
        const res = await axios.get("/your_categories_api");
        setFetchCategory(res.data.categories);
      } catch (e) {
        console.log("Error", e);
      }
    };
    categoryFetch();
  }, []);

  // Add Subcategory
  const datafetch = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post("your_subcategory_create_api", data);
      return true;
    } catch (e) {
      console.log("Error", e);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      const selectedCategory = fetchCategory.find(
        (cat) => cat._id === formData.categoryName
      );

      const data = {
        categoryId: selectedCategory._id,
        categoryName: selectedCategory.name,
        name: formData.name,
      };
      const success = await datafetch(data);

      if (success) {
        toast.success("Subcategory Added Successfully");
        navigate("/subcategories");
      } else {
        toast.error("Failed to Add Subcategory");
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };

  return (
    <AdminForm
      title="Subcategory Add"
      fields={subcategoryFormFields()}
      onSubmit={handleFormSubmit}
    />
  );
};
