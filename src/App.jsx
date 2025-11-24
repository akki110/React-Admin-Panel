import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" />
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </>
  );
};
