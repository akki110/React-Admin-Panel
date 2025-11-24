import React, { useEffect, useState, useMemo } from "react";
import { AdminForm } from "../../components/common/AdminForm";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

export const SubcategoryEdit = () => {
  const [fetchCategory, setFetchCategory] = useState([]);
  const [subcategory, setSubcategory] = useState(null);
  const { setLoading } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const datafetch = async () => {
      try {
        setLoading(true);
        const categoryRes = await axios.get("your_categories_api");
        setFetchCategory(categoryRes.data.categories);
        console.log('Cate',categoryRes.data.categories);
        const subcategoryRes = await axios.get(`your_subcategories_api/${id}`);
        setSubcategory(subcategoryRes.data.subCategory);
        console.log('Sub-Cate',subcategoryRes.data.subCategory);
      } catch (e) {
        console.log("Error", e);
      } finally {
        setLoading(false);
      }
    };

    datafetch();
  }, [id]);

  const subcategoryFormFields = useMemo(() => {
    if (!subcategory) return [];

    return [
      {
        label: "Category",
        name: "categoryId",
        type: "select",
        options: fetchCategory.map((cat) => ({
          label: cat.name,
          value: cat._id,
        })),
        value: subcategory.category.categoryId,
      },
      {
        label: "Subcategory",
        name: "name",
        type: "text",
        value: subcategory.name,
        required: true,
      },
    ];
  }, [subcategory, fetchCategory]);

  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true);
      const updatedData = {
        categoryId: formData.categoryId,
        name: formData.name,
      };
      const res = await axios.put(`your_update_subcategory_api/${id}`, updatedData);
      if (res.status === 200) {
        navigate("/subcategories");
      }
      toast.success('Subcategory Updated Successfully');
    } catch (e) {
      console.log("Error updating subcategory", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminForm
      title="Edit Subcategory"
      fields={subcategoryFormFields}
      onSubmit={handleFormSubmit}
    />
  );
};
