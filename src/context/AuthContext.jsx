import React, { createContext, useContext, useState } from "react";

const AdminContext = createContext();

export const AuthContext = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Functions

  const value = {
    isOpen,
    setIsOpen,
    loading,
    setLoading,
  };

  return (
    <AdminContext.Provider value={value}>
      {loading && (
        <div className="fixed inset-0 w-full h-screen flex items-center justify-center bg-white z-50">
          <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}
      {children}
    </AdminContext.Provider>
  );
};

export const useAuthContext = () => useContext(AdminContext);
