import React, { useState, ReactElement, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiCarWashingFill } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { FaCarSide } from "react-icons/fa";
import { IoIosPerson, IoLogoModelS } from "react-icons/io";
import { isAuthenticated } from "../utils/authData";
import AuthComponent from "../store/auth.store";

interface MenuItem {
  name: string;
  link: string;
  icon: React.ElementType;
  margin?: boolean;
  requiresAuth?: boolean;
}

interface Props {
  children: ReactElement;
}

const Home = (props: Props) => {
  const menus: MenuItem[] = [
    { name: "Home", link: "/", icon: MdOutlineDashboard, requiresAuth: true },
    { name: "Rol", link: "/rol", icon: FiMessageSquare, requiresAuth: true },
    { name: "Usuario", link: "/user", icon: AiOutlineUser, requiresAuth: true },
    { name: "Marca", link: "/brand", icon: TbReportAnalytics, requiresAuth: true },
    { name: "Modelo", link: "/model", icon: IoLogoModelS, requiresAuth: true },
    { name: "Carro", link: "/car", icon: FaCarSide, requiresAuth: true },
    { name: "Cliente", link: "/client", icon: IoIosPerson, requiresAuth: true },
    { name: "Lavado de Carro", link: "/carWash", icon: RiCarWashingFill, requiresAuth: true },
  ];

  const [open, setOpen] = useState(true);
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, [location]);

  return (
    <section className="flex gap-6 w-screen h-screen">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-400 text-gray-100 px-4`}
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
          {menus
            .filter((menu) => !menu.requiresAuth || authenticated)
            .map((menu, i) => (
              <Link
                to={menu.link}
                key={i}
                className={` ${
                  menu.margin && "mt-5"
                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
              >
                <div>{React.createElement(menu.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 10}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu.name}
                </h2>
              </Link>
            ))}
          <div>
            <AuthComponent></AuthComponent>
          </div>
        </div>
      </div>

      <div
        className={`m-3 text-xl text-gray-900  h-screen w-screen font-semibold  ${
          open ? "ml-72" : "ml-16"
        } transition-all duration-500`}
      >
        {props.children}
      </div>
    </section>
  );
};

export default Home;
