import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { DataTable } from "../../components/common/DataTable";
import axios from "axios";
import toast from "react-hot-toast";

export const CategoryList = () => {
  const [category, setCategory] = useState([]);
  const { setLoading } = useAuthContext();

  // Data Fetch
  const datafetch = async () => {
    try {
      setLoading(true);
      const res = await axios.get("your_categories_api");
      setCategory(res.data.categories);
    } catch (e) {
      console.log("Error", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    datafetch();
  }, []);

  // Delete Category
  const deleteCategory = async (row) => {
    try {
      setLoading(true);
      await axios.delete(`your_delete_category_api/${row._id}`);
      toast.success("Category Deleted Successfully");
      await datafetch();
    } catch (e) {
      console.log("Error", e);
      toast.error("Failed to Delete Category");
    } finally {
      setLoading(false);
    }
  };

  const categorycolumns = [{ key: "name", label: "Name" }];

  return (
    <DataTable
      title="Category List"
      data={category}
      addTitle="Add Category"
      addLink="/categories/add"
      columns={categorycolumns}
      filterOptions={[]}
      statusColors={[]}
      showFilter={false}
      showSearch={true}
      actions={["edit", "delete"]}
      editLink={(row) => `/categories/edit/${row._id}`}
      onDeleteConfirm={deleteCategory}
    />
  );
};
