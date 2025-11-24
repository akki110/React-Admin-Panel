import React from "react";

export const Footer = () => {
  return (
    <>
      <footer className="bg-transparent mt-5 p-4 text-center font-extralight border-t border-gray-200 text-md text-gray-400">
        © {new Date().getFullYear()} Furniture Admin Panel. All rights reserved.
      </footer>
    </>
  );
};
