import { useEffect, useState } from "react";
import { get_roles } from "../../services/rol.service";
import { IGetRoles } from "../../types/rol.types";
import CreateRol from "./CreateRol";
import Layout from "../Layout";
import PaginationComponent from "../PaginationComponent";

// import { FiEdit } from "react-icons/fi";
// import { AiFillEye, AiOutlineDelete } from "react-icons/ai";

export default function TableRol() {
  const [Roles, setRoles] = useState<IGetRoles[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const rolesPage = 10;

  useEffect(() => {
    get_roles("").then(({ data }) => {
      setRoles(data.rol);
    });
  }, []);

  const pageCount = Math.ceil(Roles.length / rolesPage);

  const changePage = ({selected}: {selected:number})=>{
    setPageNumber(selected);
  }

  const displayRoles = Roles.slice(
    pageNumber * rolesPage,
    (pageNumber + 1) * rolesPage
  )

  return (
    <>
      <Layout>
        <>
          <div className="container flex justify-center mx-center ml-16 mt-2">
              <div className="flex flex-col">
                  <div className="w-full">
                      <div className="border-b border-gray-200 shadow">
                        <CreateRol></CreateRol>
                        <table className="w-full p-2 text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400" style={{width: '100%'}}> 
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              <th scope="col" className="px-6 py-3">
                                Id
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Rol
                              </th>
                              <th scope="col" className="px-14 py-5">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {displayRoles
                            .map((rol) => (
                              <tr className="odd:bg-white" key={rol.id}>
                                <td className="px-6 py-4">{rol.id}</td>
                                <td className="px-6 py-4">{rol.type}</td>
                                <td className="px-6 py-4">
                                  <a href="#" className="px-4 py-1 text-sm text-white bg-green-500 rounded-full">See</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <a href="#" className="px-4 py-1 text-sm text-white bg-blue-300 rounded-full">Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                 
                                </td>
                              </tr>
                          ))}
                          </tbody>
                        </table>
                        <PaginationComponent pageCount={pageCount} onPageChange={changePage}/>
                      </div>
                      
                  </div>
              </div>
          </div>
        </>
      </Layout>
    </>
  );
}

