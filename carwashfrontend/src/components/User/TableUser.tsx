import { useState, useEffect } from "react";
import useUserStore from "../../store/user.store";
import CreateUser from "../User/CreateUser";
import UpdateUser from "../User/UpdateUser";
// import { ToastContainer, toast } from 'react-toastify';
import Layout from '../Layout'
import { FaTrash } from "react-icons/fa";
import { AiOutlineZoomIn } from "react-icons/ai";

export default function TableUsers(){
    const [userDelete, setUserDelete] = useState<{id: number; userEmail: string } | null>(null);
    const {OnGetUsers, OnDeleteUser, users} = useUserStore()

    useEffect(() => {
        OnGetUsers('')
    }, []);

    const handleDelete = (id: number, userEmail: string) => {
        setUserDelete({id, userEmail});
    }

    const confirmDelete = () => {
        if(userDelete){
            OnDeleteUser(userDelete.id);
            // toast.success(`The user has been successfully deleted`,{
            //     position: 'top-right',
            //     autoClose: 0,
            // });

            setUserDelete(null);
        }
    }

    const cancelDelete = () => {
        setUserDelete(null);
    };

    const handleSearch = (name = "")=>{
        OnGetUsers(name)
    }

    return (
      <>
        <Layout>
          <>
            <div className=" p-10 w-full">
              <div className="flex flex-col">
                <div className="w-full">
                  <div className="border-b border-gray-200 shadow">
                    <CreateUser />
                    <div className="flex justify-start p-5 items-center text-gray-400 focus-within:text-gray-400">
                      <AiOutlineZoomIn className="w-5 h-5 absolute ml-3" />
                      <input
                        className="pr-3 pl-10 py-2 font-semibold placeholder-gray-400  rounded-2xl border-none ring-2 ring-gray-400 focus:ring-gray-600 focus:ring-2 "
                        type="text"
                        placeholder="Buscar...."
                        onChange={(e) => {
                          handleSearch(e.target.value);
                        }}
                      />
                    </div>
                    <div className="flex justify-center p-8">
                      <table className="min-w-full">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr className="bg-[#0e0e0e] text-white">
                            <th className="py-2 px-4">Id</th>
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Rol</th>
                            <th className="py-2 px-4">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {users &&
                            users.map((user) => (
                              <tr key={user.id}>
                                <td className="py-2 px-4 whitespace-nowrap text-center">
                                  {user.id}
                                </td>
                                <td className="py-2 px-4 whitespace-nowrap text-center">
                                  {user.name}
                                </td>
                                <td className="py-2 px-4 whitespace-nowrap text-center">
                                  {user.email}
                                </td>
                                <td className="py-2 px-4 whitespace-nowrap text-center">
                                  {user.rol.type}
                                </td>
                                <td className="py-2 px-4 whitespace-nowrap text-center">
                                  <div className="flex items-center justify-center space-x-2">
                                    <UpdateUser
                                      id={user.id}
                                      nameUser={user.name}
                                      emailUser={user.email}
                                      newRolId={user.rolId}
                                    />
                                    <button
                                      onClick={() =>
                                        handleDelete(user.id, user.email)
                                      }
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

              {/* <ToastContainer /> */}
              {userDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <p>
                      ¿Estás seguro de que desea eliminar a "
                      {userDelete.userEmail}"?
                    </p>
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={confirmDelete}
                        className="bg-green-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full"
                      >
                        Si
                      </button>
                      <button
                        onClick={cancelDelete}
                        className="bg-red-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full ml-4"
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        </Layout>
      </>
    );
}
