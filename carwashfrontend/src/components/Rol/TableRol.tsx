import { useEffect, useState } from "react";
import { get_roles } from "../../services/rol.service";
import { IGetRoles } from "../../types/rol.types";
import CreateRol from "./CreateRol";
import Layout from "../Layout";



export default function TableRol() {
  const [Roles, setRoles] = useState<IGetRoles[]>([]);

  useEffect(() => {
    get_roles("").then(({ data }) => {
      setRoles(data.rol);
    });
  }, []);

  return (
    // aca
    <>
      <Layout>
        <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <CreateRol></CreateRol>
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Rol
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Roles && Roles.map((rol) => (
              <tr className="odd:bg-white">
                <td className="px-6 py-4">{rol.id}</td>
                <td className="px-6 py-4">{rol.type}</td>
                <td className="px-6 py-4">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </>
      </Layout>
    </>
  );
}