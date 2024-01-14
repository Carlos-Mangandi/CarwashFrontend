import { useState, useEffect } from "react";
import useUserStore from "../../store/user.store";
import CreateUser from "../User/CreateUser";
import UpdateUser from "../User/UpdateUser";
import Layout from "../Layout";
import { FaTrash } from "react-icons/fa";

export default function TableUsers() {
  const [userDelete, setUserDelete] = useState<{
    id: number;
    userEmail: string;
  } | null>(null);
  const { OnGetUsers, OnDeleteUser, users, pagination_users } = useUserStore();
  const [displayCount, setDisplayCount] = useState(5);  

  useEffect(() => {
    OnGetUsers(1, displayCount, "");
  }, [OnGetUsers, displayCount]);

  const handleDelete = (id: number, userEmail: string) => {
    setUserDelete({ id, userEmail });
  };

  const confirmDelete = () => {
    if (userDelete) {
      OnDeleteUser(userDelete.id).then(() => {
        OnGetUsers(displayCount, 5, "");
        setUserDelete(null);
      });
    }
  };

  const cancelDelete = () => {
    setUserDelete(null);
  };

  const handleSearch = (name: string) => {
    OnGetUsers(1, 5, name);
  };

  const handleDisplayCountChange = (event: { target: { value: string } }) => {
    const newDisplayCount = parseInt(event.target.value, 10);
    setDisplayCount(newDisplayCount);
  };

  const handleNext = () => {
    console.log("Current Page:", pagination_users.currentPage);
    console.log("Total Pages:", pagination_users.totalPage);

    if (pagination_users.currentPage < pagination_users.totalPage) {
      OnGetUsers(pagination_users.currentPage + 1, displayCount, "");
    }
  };

  const handlePrev = () => {
    console.log("Current Page:", pagination_users.currentPage);
    console.log("Total Pages:", pagination_users.totalPage);

    if (pagination_users.currentPage > 1) {
      OnGetUsers(pagination_users.currentPage - 1, displayCount, "");
    }
  };

  console.log("Is Prev Button Disabled:", pagination_users.currentPage === 1);
  console.log(
    "Is Next Button Disabled:",
    pagination_users.currentPage === pagination_users.totalPage
  );

  return (
    <>
      <Layout>
        <>
          <div className=" p-10 w-full">
            <CreateUser />
            <div className="flex justify-between p-5 items-center text-gray-400 focus-within:text-gray-400">
              <input
                className="pr-3 pl-10 py-2 font-normal placeholder-gray-400  rounded-2xl border-none ring-2 ring-gray-400 focus:ring-gray-600 focus:ring-2 "
                type="text"
                placeholder="Buscar...."
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              />
              <div className="flex items-center">
                    <p className="text-sm font-semibold text-black mr-4">
                      Cantidad a mostrar
                    </p>
                    <select
                      className="py-2 text-sm font-normal border outline-none rounded-xl"
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
                <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-6">Id</th>
                    <th className="py-3 px-6">Name</th>
                    <th className="py-3 px-6">Email</th>
                    <th className="py-3 px-6">Rol</th>
                    <th className="py-3 px-6">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {users &&
                    users.map((user) => (
                      <tr key={user.id}>
                        <td className="py-2 px-4 text-center font-normal">
                          {user.id}
                        </td>
                        <td className="py-2 px-4 text-center font-normal">
                          {user.name}
                        </td>
                        <td className="py-2 px-4 text-center font-normal">
                          {user.email}
                        </td>
                        <td className="py-2 px-4 text-center font-normal">
                          {user.rol.type}
                        </td>
                        <td className="py-2 px-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <UpdateUser
                              id={user.id}
                              nameUser={user.name}
                              emailUser={user.email}
                              newRolId={user.rolId}
                            />
                            <button
                              onClick={() => handleDelete(user.id, user.email)}
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

          {userDelete && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <p>
                  ¿Estás seguro de que desea eliminar a "{userDelete.userEmail}
                  "?
                </p>
                <div className="mt-4 flex justify-center">
                  <button
                  type="button"
                    onClick={confirmDelete}
                    className="bg-green-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full"
                  >
                    ELIMINAR
                  </button>
                  <button
                    onClick={cancelDelete}
                    className="bg-red-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full ml-4"
                  >
                    CANCELAR
                  </button>
                </div>
              </div>
            </div>
          )}

<div className="pagination-controls flex items-center justify-center space-x-4">
          <button
            className={`px-4 py-2 border rounded-full shadow-md transition-transform transform hover:scale-105 ${
              pagination_users.currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
            onClick={handlePrev}
            disabled={pagination_users.currentPage === 1}
          >
            Atrás
          </button>
          <span className="text-xl font-semibold text-gray-700">
            Página {pagination_users.currentPage} de{" "}
            {pagination_users.totalPage}
          </span>
          <button
            className={`px-4 py-2 border rounded-full shadow-md transition-transform transform hover:scale-105 ${
              pagination_users.currentPage === pagination_users.totalPage
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
    </>
  );
}
