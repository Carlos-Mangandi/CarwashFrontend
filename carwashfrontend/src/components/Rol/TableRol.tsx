import { useEffect, useState } from "react";
import CreateRol from "./CreateRol";
import UpdateRol from "./UpdateRol";
import Layout from "../Layout";
import useRolStore, { useRolesStore } from "../../store/rol.store";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

// import { FiEdit } from "react-icons/fi";
// import { AiFillEye, AiOutlineDelete } from "react-icons/ai";

export default function TableRol() {
  const { OnDeleteRol } = useRolStore();
  const [rolDelete, setRolDelete] = useState<{
    id: number;
    rolName: string;
  } | null>(null);
  const { OnGetRoles, roles } = useRolesStore();

  useEffect(() => {
    OnGetRoles();
  }, []);

  const handleDelete = (id: number, rolName: string) => {
    setRolDelete({ id, rolName });
  };

  const confirmDelete = () => {
    if (rolDelete) {
      OnDeleteRol(rolDelete.id);

      Swal.fire({
        icon: "success",
        title: "Rol Eliminado",
        text: `El rol "${rolDelete.rolName}" ha sido eliminado correctamente.`,
      });

      setRolDelete(null);
    }
  };

  const cancelDelete = () => {
    setRolDelete(null);
  };
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
                                  rolId={rol.id}
                                  rolNameUpdate={rol.type}
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
        </>
      </Layout>
    </>
  );
}
