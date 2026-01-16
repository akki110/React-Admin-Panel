import React, { useEffect, useState } from "react";
import { DataTable } from "../../components/common/DataTable";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

export const SubcategoryList = () => {
  const [subcategory, setSubcategory] = useState([]);
  const categorycolumns = [
    { key: "name", label: "Subcategory Name" },
    { key: "categoryName", label: "Category Name" },
  ];
  const { setLoading } = useAuthContext();

  // Data Fetch
  const datafetch = async () => {
    try {
      setLoading(true);
      const res = await axios.get("your_subcategories_api");

      // Map the data to include category name
      const subcategories = res.data.subCategories.map((subcategory) => ({
        ...subcategory,
        categoryName: subcategory.category.name,
      }));

      setSubcategory(subcategories);
    } catch (e) {
      console.log("Error", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    datafetch();
  }, []);

  // Delete Category (uncomment when required)
  const deleteCategory = async (row) => {
    try {
      setLoading(true);
      await axios.delete(`your_delete_subcategory_api/${row._id}`);
      toast.success("Category Deleted Successfully");
      await datafetch();
    } catch (e) {
      console.log("Error", e);
      toast.error("Failed to Delete Category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataTable
      title="Subcategory List"
      data={subcategory}
      addTitle="Add Subategory"
      addLink="/subcategories/add"
      columns={categorycolumns}
      filterOptions={[]}
      statusColors={[]}
      showFilter={false}
      showSearch={true}
      actions={["edit", "delete"]}
      editLink={(row) => `/subcategories/edit/${row._id}`}
      onDeleteConfirm={deleteCategory}
    />
  );
};
