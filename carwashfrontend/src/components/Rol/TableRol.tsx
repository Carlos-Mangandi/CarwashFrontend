import { useEffect, useState } from "react";
import CreateRol from "./CreateRol";
import UpdateRol from "./UpdateRol";
import Layout from "../Layout";
import { useRolesStore } from "../../store/rol.store";
import { FaTrash } from "react-icons/fa";

export default function TableRol() {
  const [roleToDelete, setRoleToDelete] = useState<{
    id: number;
    rolName: string;
  } | null>(null);
  const { OnGetRoles, OnDeleteRol, roles, pagination_roles } = useRolesStore();
  const [displayCount, setDisplayCount] = useState(5);

  useEffect(() => {
    OnGetRoles(1, displayCount, "");
  }, [OnGetRoles, displayCount]);

  const handleDelete = (id: number, rolName: string) => {
    setRoleToDelete({ id, rolName });
  };

  const confirmDelete = () => {
    if (roleToDelete) {
      OnDeleteRol(roleToDelete.id).then(() => {
        OnGetRoles(displayCount, 5, "");
        setRoleToDelete(null);
      });
    }
  };

  const cancelDelete = () => {
    setRoleToDelete(null);
  };

  const handleSearch = (name: string) => {
    OnGetRoles(1, 5, name);
  };

  const handleDisplayCountChange = (event: { target: { value: string } }) => {
    const newDisplayCount = parseInt(event.target.value, 10);
    setDisplayCount(newDisplayCount);
  };

  const handleNext = () => {
    console.log("Current Page:", pagination_roles.currentPage);
    console.log("Total Pages:", pagination_roles.totalPage);

    if (pagination_roles.currentPage < pagination_roles.totalPage) {
      OnGetRoles(pagination_roles.currentPage + 1, displayCount, "");
    }
  };

  const handlePrev = () => {
    console.log("Current Page:", pagination_roles.currentPage);
    console.log("Total Pages:", pagination_roles.totalPage);

    if (pagination_roles.currentPage > 1) {
      OnGetRoles(pagination_roles.currentPage - 1, displayCount, "");
    }
  };

  console.log("Is Prev Button Disabled:", pagination_roles.currentPage === 1);
  console.log(
    "Is Next Button Disabled:",
    pagination_roles.currentPage === pagination_roles.totalPage
  );

  return (
    <Layout>
      <>
        <div className="p-10 w-full">
          <div className="flex flex-col">
            <div className="w-full">
              <div className="border-b border-gray-200 shadow">
                <CreateRol></CreateRol>
                <div className="flex justify-between p-5 items-center text-black focus-within:text-gray-600">
                  <input
                    className="pr-3 pl-10 py-2 font-normal placeholder-gray-400 rounded-2xl border-none ring-2 ring-gray-400 focus:ring-gray-600 focus:ring-2"
                    type="text"
                    placeholder="Buscar...."
                    onChange={(e) => {
                      handleSearch(e.target.value);
                    }}
                  />
                  <div className="flex items-center">
                    <p className="text-sm font-semibold text-gray-800 mr-4">
                      Cantidad a mostrar
                    </p>
                    <select
                      className="py-2 text-sm font-semibold border outline-none rounded-xl"
                      onChange={handleDisplayCountChange}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                      <option value={20}>20</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>
                </div>

                <div className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-black">
                  <table className="min-w-full">
                    <thead className="text-xs uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th className="px-6 py-3">Id</th>
                        <th className="px-6 py-3">Rol</th>
                        <th className="px-6 py-3">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                      {roles &&
                        roles.map((rol) => (
                          <tr key={rol.id}>
                            <td className="px-4 py-2 font-normal">{rol.id}</td>
                            <td className="px-4 py-2 font-normal">
                              {rol.type}
                            </td>
                            <td className="px-4 py-2">
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
        </div>

        {roleToDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <p>
                ¿Estás seguro que quieres eliminar el rol "
                {roleToDelete.rolName}"?
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

        <div className="pagination-controls flex items-center justify-center space-x-4">
          <button
            className={`px-4 py-2 border rounded-full shadow-md transition-transform transform hover:scale-105 ${
              pagination_roles.currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
            onClick={handlePrev}
            disabled={pagination_roles.currentPage === 1}
          >
            Atrás
          </button>
          <span className="text-xl font-semibold text-gray-700">
            Página {pagination_roles.currentPage} de{" "}
            {pagination_roles.totalPage}
          </span>
          <button
            className={`px-4 py-2 border rounded-full shadow-md transition-transform transform hover:scale-105 ${
              pagination_roles.currentPage === pagination_roles.totalPage
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
            onClick={handleNext}
          >
            Siguiente
          </button>
        </div>
      </>
    </Layout>
  );
}
