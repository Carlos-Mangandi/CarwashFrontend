import { useEffect, useState } from "react";
import CreateRol from "./CreateRol";
import UpdateRol from "./UpdateRol";
import Layout from "../Layout";
import { useRolesStore } from "../../store/rol.store";
import { FaTrash } from "react-icons/fa";

export default function TableRol() {
  const [rolDelete, setRolDelete] = useState<{ id: number; rolName: string;} | null>(null);
  const { OnGetRoles, OnDeleteRol, roles, totalRoles, limit } = useRolesStore();
  const [page, setPage] = useState(1);

  useEffect(() => {
    OnGetRoles();
  }, [page]);

  const handleDelete = (id: number, rolName: string) => {
    setRolDelete({ id, rolName });
  };

  const confirmDelete = () => {
    if (rolDelete) {
      OnDeleteRol(rolDelete.id);

      setRolDelete(null);
    }
  };

  const cancelDelete = () => {
    setRolDelete(null);
  };

  const handlePage = (newPage: number) => {
    setPage(newPage)
  }

  return (
    <>
      <Layout>
        <>
          <div className="p-10 w-full">
            <div className="flex flex-col">
              <div className="w-full">
                <div className="border-b border-gray-200 shadow">
                  <CreateRol></CreateRol>
                  <table className="w-full p-2 text-sm text-center rtl:text-right text-gray-500 dark:text-black">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Rol
                        </th>
                        <th scope="col" className="px-14 py-5">
                          Acción
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {roles &&
                        roles.map((rol) => (
                          <tr className="odd:bg-white" key={rol.id}>
                            <td className="px-6 py-4">{rol.id}</td>
                            <td className="px-6 py-4">{rol.type}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center space-x-5">
                                <UpdateRol
                                  id={rol.id}
                                  nameRol={rol.type}
                                ></UpdateRol>
                                <button
                                  onClick={() => handleDelete(rol.id, rol.type)}
                                  className="text-red-500"
                                >
                                  <FaTrash size={24}></FaTrash>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {rolDelete && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <p>
                  ¿Estás seguro que quieres eliminar el rol "{rolDelete.rolName}
                  "?
                </p>
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={confirmDelete}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={cancelDelete}
                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full ml-4"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* <div className="mt-4 flex justify-center">
            {Array.from(
              { length: Math.ceil(totalRoles / limit) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePage(index + 1)}
                  className={`mx-2 ${
                    index + 1 === page ? "bg-blue-500" : "bg-gray-300"
                  } text-black font-bold py-2 px-4 rounded-full`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div> */}
          <div className="bg-white p-4 flex items-center justify-center">
            <button
              onClick={() => handlePage(page - 1)}
              className="px-4 py-2 text-green-600 transition-colors duration-150 bg-white rounded-l-lg focus:shadow-outline hover:bg-green-100"
              disabled={page === 1}
            >
              Prev
            </button>
            {Array.from(
              { length: Math.ceil(totalRoles / limit) },
              (_, index) => (
              <button
                key={index}
                onClick={() => handlePage(index + 1)}
                className={`mx-2 ${
                  index + 1 === page ? "bg-blue-500" : "bg-gray-300"
                } text-black font-bold py-2 px-4 rounded-full focus:outline-none`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePage(page + 1)}
              className="px-4 py-2 text-green-600 transition-colors duration-150 bg-white rounded-r-lg focus:shadow-outline hover:bg-green-100"
              disabled={page === totalRoles}
            >
              Next
            </button>
          </div>
        </>
      </Layout>
    </>
  );
}