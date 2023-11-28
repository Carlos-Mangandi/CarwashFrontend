import { useEffect, useState } from "react";
import CreateRol from "./CreateRol";
import UpdateRol from "./UpdateRol";
import Layout from "../Layout";
import useRolStore from "../../store/rol.store";
import { FaTrash } from "react-icons/fa";

// import { FiEdit } from "react-icons/fi";
// import { AiFillEye, AiOutlineDelete } from "react-icons/ai";

export default function TableRol() {
  const {roles, OnGetRoles, OnDeleteRol} = useRolStore();
  const [rolDelete, setRolDelete] = useState<{id:number; rolName: string} | null>(null)

  useEffect(() =>{
    OnGetRoles();
  }, [])

 const handleDelete = (id: number, rolName: string)=>{
  setRolDelete({id, rolName})
 }

 const confirmDelete = () =>{
  if(rolDelete){
    OnDeleteRol(rolDelete.id);
    alert("Rol was eliminated")
    setRolDelete(null);
  }
 }

 const cancelDelete = () => {
  setRolDelete(null)
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
                        <table className="w-full p-2 text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400" > 
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
                            {roles && roles
                            .map((rol) => (
                              <tr className="odd:bg-white" key={rol.id}>
                                <td className="px-6 py-4">{rol.id}</td>
                                <td className="px-6 py-4">{rol.type}</td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center justify-center space-x-5">
                                    <UpdateRol rolId={rol.id} rolNameUpdate={rol.type}></UpdateRol>
                                    <button onClick={() => handleDelete(rol.id, rol.type)} className="text-red-500" >
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
                <p>Are you sure you want to delete the role "{rolDelete.rolName}"?</p>
                <div className="mt-4 flex justify-center">
                  <button onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
                      Delete
                  </button>
                  <button onClick={cancelDelete} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full ml-4">
                      Cancel
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

