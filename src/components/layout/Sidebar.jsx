import React, { useState } from "react";
import {
  ShoppingCart,
  Users,
  Package,
  BarChart,
  Home,
  Settings,
  ChevronDown,
  ChevronUp,
  User,
  PhoneCallIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { BsX } from "react-icons/bs";
import { AiOutlineAppstore } from "react-icons/ai";
import { FaRegFolderOpen } from "react-icons/fa";

export const Sidebar = () => {
  const { isOpen, setIsOpen } = useAuthContext();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const menu = [
    { id: 1, label: "Dashboard", icon: Home, link: "/" },
    {
      id: 2,
      label: "Category",
      icon: AiOutlineAppstore,
      children: [
        { id: "2-1", label: "Add Category", link: "/categories/add" },
        { id: "2-2", label: "Manage Category", link: "/categories" },
      ],
    },
    {
      id: 3,
      label: "Subcategory",
      icon: FaRegFolderOpen,
      children: [
        { id: "3-1", label: "Add Subcategory", link: "/subcategories/add" },
        { id: "3-2", label: "Manage Subcategory", link: "/subcategories" },
      ],
    },
    { id: 4, label: "Contact List", icon: PhoneCallIcon, link: "/contact-list" },
    { id: 5, label: "User List", icon: User, link: "/user-list" },
    {
      id: 6,
      label: "Common",
      icon: ShoppingCart,
      children: [
        { id: "101", label: "Form", link: "/form" },
        { id: "102", label: "Table", link: "/table" },
        { id: "103", label: "Modal, Toast, Tooltips", link: "/modal" },
      ],
    },
  ];

  // Sidebar content (reusable for both desktop and mobile)
  const renderMenu = () => (
    <nav className="space-y-2">
      {menu.map((item) => (
        <div key={item.id}>
          {item.children ? (
            <>
              <button
                onClick={() => toggleDropdown(item.id)}
                className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-indigo-50 text-gray-700"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </div>
                {openDropdown === item.id ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {openDropdown === item.id && (
                <div className="ml-9 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.id}
                      to={child.link}
                      end
                      className={({ isActive }) =>
                        `block px-2 py-1 rounded-md text-sm ${
                          isActive
                            ? "bg-indigo-50 text-indigo-700 "
                            : "text-gray-600 hover:bg-indigo-100"
                        }`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </>
          ) : (
            <NavLink
              to={item.link}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50 text-gray-700"
              onClick={() => {
                setIsOpen(false);
                setOpenDropdown(null);
              }}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          )}
        </div>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar (always visible on md+) */}
      <aside className="p-4 fixed w-64 h-[calc(100vh-4rem)] hidden md:block overflow-y-auto shadow bg-white">
        {renderMenu()}
      </aside>

      {/* Mobile Sidebar Offcanvas */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 md:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 flex justify-end items-center border-b border-gray-200">
          <button onClick={() => setIsOpen(false)}>
            <BsX className="text-3xl text-indigo-400" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto">{renderMenu()}</div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-800 opacity-20 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
