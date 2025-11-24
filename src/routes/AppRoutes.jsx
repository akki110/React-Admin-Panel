import React from "react";
import { Route, Routes } from "react-router-dom";
import { AdminLayout } from "../components/layout/AdminLayout";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { DataTable } from "../components/common/DataTable";
import { AdminForm } from "../components/common/AdminForm";
import ModalDemo from "../components/common/Modal";
import { ContactList } from "../pages/ContactList";
import { CategoryList } from "../pages/category/CategoryList";
import { CategoryAdd } from "../pages/category/CategoryAdd";
import { CategoryEdit } from "../pages/category/CategoryEdit";
import { SubcategoryList } from "../pages/subcategory/SubcategoryList";
import { SubcategoryAdd } from "../pages/subcategory/SubcategoryAdd";
import { SubcategoryEdit } from "../pages/subcategory/SubcategoryEdit";
import { UserList } from "../pages/UserList";

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route element = {<AdminLayout />}>
          <Route path="/" element = {<Dashboard />} />

          {/* Category */}
          <Route path="/categories" element = {<CategoryList />} />
          <Route path="/categories/add" element = {<CategoryAdd />} />
          <Route path="/categories/edit/:id" element = {<CategoryEdit />} />

          {/* Sub Category */}
          <Route path="/subcategories" element = {<SubcategoryList />} />
          <Route path="/subcategories/add" element = {<SubcategoryAdd />} />
          <Route path="/subcategories/edit/:id" element = {<SubcategoryEdit />} />

          {/* Contact List */}
          <Route path="/contact-list" element = {<ContactList />} />

          {/* User List */}
          <Route path="/user-list" element = {<UserList />} />

          {/* Extra Remove After All Done */}
          <Route path="/table" element = {<DataTable />} />
          <Route path="/form" element = {<AdminForm />} />
          <Route path="/modal" element = {<ModalDemo />} />
        </Route>
      </Routes>
    </>
  );
};
