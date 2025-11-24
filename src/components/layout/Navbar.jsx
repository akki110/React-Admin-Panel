import React from "react";
import logo from "../../assets/images/Logo_Dhivoo.png";
import { CiBellOn } from "react-icons/ci";
import { data, Link } from "react-router-dom";
import { LuUser } from "react-icons/lu";
import { BiCommentDetail } from "react-icons/bi";
import { MenuIcon } from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";
import { HiMenu, HiMenuAlt3 } from "react-icons/hi";

export const Navbar = () => {
  const { setIsOpen } = useAuthContext();

  const notifications = [
    { id: 1, user: "Mark Crowly", product_title: "Sofa sets", time: "2m ago" },
    {
      id: 2,
      user: "Sebistian Cook",
      product_title: "Sofa sets",
      time: "10m ago",
    },
    { id: 3, user: "Tylor Koshi", product_title: "Sofa sets", time: "30m ago" },
    { id: 4, user: "Mark Crowly", product_title: "Sofa sets", time: "2m ago" },
    {
      id: 5,
      user: "Sebistian Cook",
      product_title: "Sofa sets",
      time: "10m ago",
    },
  ];

  const admin = [
    { id: 1, title: "My Profile", icon: <LuUser />, link: "/" },
    { id: 1, title: "My Profile", icon: <BiCommentDetail />, link: "/" },
  ];
  return (
    <div className="flex items-center justify-between h-16 px-6">
      <div className="flex items-center">
        <img className="h-10 w-auto" src={logo} alt="dhivoo-logo" />
      </div>

      <div className="flex items-center gap-4">
        <button className="md:hidden text-2xl text-indigo-500" onClick={() => setIsOpen(true)}>
          <HiMenuAlt3 />
        </button>
        <div className="relative group">
          {/* Bell Icon Button */}
          <button className="w-8 h-8 flex justify-center items-center cursor-pointer">
            <CiBellOn className="text-gray-700 text-2xl" />
          </button>

          {/* Notification Badge */}
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-indigo-500"></span>

          {/* Dropdown */}
          <div className="absolute right-0 w-64 bg-white rounded-md shadow opacity-0 scale-95 transform transition-all duration-200 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto">
            <div className="">
              <ul>
                {notifications.map((data) => (
                  <Link to={data.link} key={data.id}>
                    <li className="py-2 cursor-pointer px-4 flex flex-col justify-center items-start gap-2 text-gray-400 text-md hover:text-indigo-500 hover:bg-indigo-50">
                      <h6 className="text-sm truncate w-54">
                        {data.user} has purchased {data.product_title}
                      </h6>
                      <p className="text-[12px]">{data.time} ago</p>
                    </li>
                  </Link>
                ))}
              </ul>
              {/* Footer */}
              <Link
                to="/view-more"
                className="flex justify-center items-center w-10/12 h-8 my-3 mx-auto border border-indigo-500 rounded-md text-indigo-500"
              >
                See All Orders
              </Link>
            </div>
          </div>
        </div>

        <div className="relative group">
          {/* Admin */}
          <button className=" cursor-pointer w-8 h-8 flex justify-center items-center rounded-full border border-indigo-500 bg-indigo-100 text-indigo-500 font-bold">
            A
          </button>
          {/* Dropdown */}
          <div className="absolute right-0 w-48 bg-white rounded-md shadow opacity-0 scale-95 transform transition-all duration-200 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto">
            <div className="">
              <ul>
                {admin.map((data) => (
                  <Link to={data.link} key={data.id}>
                    <li className="py-2 cursor-pointer flex justify-start items-center gap-2 text-gray-400 text-md px-4 hover:text-indigo-500 hover:bg-indigo-50">
                      {data.icon} {data.title}
                    </li>
                  </Link>
                ))}
              </ul>
              <Link
                to="/view-more"
                className="flex justify-center items-center w-10/12 h-8 my-3 mx-auto border border-indigo-500 rounded-md text-indigo-500"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
