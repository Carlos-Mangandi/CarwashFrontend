import Layout from "../Layout";
import { FaTrash } from "react-icons/fa";
import useClientStore from "../../store/client.store";
import { useEffect, useState } from "react";
import CreateClient from "./createClient";
import UpdateClient from "./updateClient";

function TableClient() {
  const { client, OnGetClient, OnDeleteClient } = useClientStore();
  const [clientDelete, setClientDelete] = useState<{
    id: number;
    clientName: string;
  } | null>(null);

  useEffect(() => {
    OnGetClient();
  }, []);
  const handleDelete = (id: number, clientName: string) => {
    setClientDelete({ id, clientName });
  };
  const confirmDelete = () => {
    if (clientDelete) {
      OnDeleteClient(clientDelete.id);
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
          <div className="p-10 w-full">
            <CreateClient></CreateClient>
            <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-black">
              <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-blue-500 dark:text-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Telefono
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Carro
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {client &&
                  client.map((client) => (
                    <tr className="bg-white" key={client.id}>
                      <td className="px-6 py-4">{client.id}</td>
                      <td className="px-6 py-4">{client.name}</td>
                      <td className="px-6 py-4">{client.phone}</td>
                      <td className="px-6 py-4">{client.car.serialnumber}</td>
                      <td className="px-4 py-2 flex items-center justify-around">
                        <UpdateClient
                          id={client.id}
                          nameClient={client.name}
                          phoneClient={client.phone}
                          newCarId={client.carId}
                        ></UpdateClient>
                        <button
                          onClick={() => handleDelete(client.id, client.name)}
                          className="text-red-500 bg-white"
                        >
                          <FaTrash size={22}></FaTrash>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {clientDelete && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <p>
                  Estas seguro de eliminar el cliente? "
                  {clientDelete.clientName}"?
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
export default TableClient;
