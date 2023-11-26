import React, { useState, ReactElement } from "react";
import { Link } from "react-router-dom";

import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiCarWashingFill} from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser} from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { FaCarSide } from "react-icons/fa";
import { IoIosPerson, IoLogoModelS } from "react-icons/io";

interface Props {
  children: ReactElement;
}

const Home = (props: Props) => {
  const menus = [
    { name: "Home", link: "/", icon: MdOutlineDashboard },
    { name: "User", link: "/user", icon: AiOutlineUser },
    { name: "Rol", link: "/rol", icon: FiMessageSquare },
    { name: "Brand", link: "/brand", icon: TbReportAnalytics, margin: true },
    { name: "Car", link: "/car", icon: FaCarSide },
    { name: "CarWash", link: "/carWash", icon: RiCarWashingFill },
    { name: "Client", link: "/client", icon: IoIosPerson, margin: true },
    { name: "Model", link: "/model", icon: IoLogoModelS },
  ];

  const [open, setOpen] = useState(true);

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
        }}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>

      <div
        className={`m-3 text-xl text-gray-900 font-semibold ${
          open ? "ml-72" : "ml-16"
        } transition-all duration-500`}
      >
        {props.children}
      </div>
    </section>
  );
};

export default Home;
