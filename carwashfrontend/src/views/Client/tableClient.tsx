import { useState, useEffect } from "react";
import useClientStore from "../../store/client.store";
// import CreateUser from "../User/CreateUser";
// import UpdateUser from "../User/UpdateUser";
import CreateClient from "../Client/createClient";
import Layout from "../../components/Layout";
import UpdateClient from "./updateClient";
import { FaTrash } from "react-icons/fa";

export default function TableUsers() {
  const [clientDelete, setClientDelete] = useState<{
    id: number;
    clientName: string;
  } | null>(null);
  const { OnGetClient, OnDeleteClient, client } = useClientStore();

  useEffect(() => {
    OnGetClient();
  }, []);

  const handleDelete = (id: number, clientName: string) => {
    setClientDelete({ id, clientName });
  };

  const confirmDelete = () => {
    if (clientDelete) {
      OnDeleteClient(clientDelete.id);
      // toast.success(`The user has been successfully deleted`,{
      //     position: 'top-right',
      //     autoClose: 0,
      // });

      setClientDelete(null);
    }
  };

  const cancelDelete = () => {
    setClientDelete(null);
  };

  return (
    <>
      <Layout>
        <>
          <div className=" p-10 w-full">
                <CreateClient />
                <div className="flex justify-center p-8">
                  <table className="min-w-full">
                    <thead className="text-xs text-black uppercase bg-gray-50  dark:text-white">
                      <tr className="dark:bg-blue-500 text-white">
                        <th className="py-2 px-4">Id</th>
                        <th className="py-2 px-4">Nombre</th>
                        <th className="py-2 px-4">Telefono</th>
                        <th className="py-2 px-4">Carro</th>
                        <th className="py-2 px-4">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {client &&
                        client.map((client) => (
                          <tr key={client.id}>
                            <td className="py-2 px-4 whitespace-nowrap text-center">
                              {client.id}
                            </td>
                            <td className="py-2 px-4 whitespace-nowrap text-center">
                              {client.name}
                            </td>
                            <td className="py-2 px-4 whitespace-nowrap text-center">
                              {client.phone}
                            </td>
                            <td className="py-2 px-4 whitespace-nowrap text-center">
                              {client.car.color}
                            </td>
                            <td className="py-2 px-4 whitespace-nowrap text-center">
                              <div className="flex items-center justify-center space-x-2">
                                <UpdateClient
                                  id={client.id}
                                  nameClient={client.name}
                                  phoneClient={client.phone}
                                  newCarId={client.carId}
                                />
                                <button
                                  onClick={() =>
                                    handleDelete(client.id, client.name)
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
           

          {/* <ToastContainer /> */}
          {clientDelete && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <p>
                  Esta seguro de eliminar el cliente? "{clientDelete.clientName}
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