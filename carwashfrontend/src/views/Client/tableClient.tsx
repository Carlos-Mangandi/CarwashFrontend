import { useState, useEffect, ChangeEvent } from "react";
import useClientStore from "../../store/client.store";
import CreateClient from "../Client/createClient";
import Layout from "../../components/Layout";
import { FontAwesomeIcon } from "../../plugins/font-awesome";
import UpdateClient from "./updateClient";
import { MdDelete } from "react-icons/md";
import { TiMediaPlayReverse } from "react-icons/ti";
import { TiMediaPlay } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCircle } from "react-icons/fa";

export default function TableUsers() {
  const [clientDelete, setClientDelete] = useState<{
    id: number;
    clientName: string;
  } | null>(null);
  const { OnGetClient, OnDeleteClient, client, pagination_client } =
    useClientStore();
  const [displayCount, setDisplayCount] = useState(5);
  const [name, SetName] = useState("");
  const [phone, SetPhone] = useState("");

  useEffect(() => {
    OnGetClient(1, displayCount, name, phone);
  }, [OnGetClient, displayCount, name, phone]);

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
  const handleSearchName = (event: ChangeEvent<HTMLInputElement>) => {
    SetName(event.target.value);
  };
  const handleSearchPhone = (event: ChangeEvent<HTMLInputElement>) => {
    SetPhone(event.target.value);
  };
  const handleDisplayCountChange = (event: { target: { value: string } }) => {
    const newDisplayCount = parseInt(event.target.value, 10);
    setDisplayCount(newDisplayCount);
  };

  const handleNext = () => {
    console.log("Current Page:", pagination_client.currentPage);
    console.log("Total Pages:", pagination_client.totalPage);

    if (pagination_client.currentPage < pagination_client.totalPage) {
      OnGetClient(pagination_client.currentPage + 1, displayCount, "", "");
    }
  };

  const handlePrev = () => {
    console.log("Current Page:", pagination_client.currentPage);
    console.log("Total Pages:", pagination_client.totalPage);

    if (pagination_client.currentPage > 1) {
      OnGetClient(pagination_client.currentPage - 1, displayCount, "", "");
    }
  };

  console.log("Is Prev Button Disabled:", pagination_client.currentPage === 1);
  console.log(
    "Is Next Button Disabled:",
    pagination_client.currentPage === pagination_client.totalPage
  );

  return (
    <>
      <Layout>
        <>
          <div className=" p-10 w-full">
            <CreateClient />
            <div className="flex flex-col md:flex-row justify-start p-5 items-center text-gray-400 focus-within:text-gray-400">
              <div className="mb-4 md:mb-0 md:mr-4">
                <FontAwesomeIcon
                  icon="search"
                  className="absolute text-sm ml-3 mt-1 text-black"
                  scale="2"
                />
                <p className="text-sm font-semibold text-gray-800 ml-8 md:ml-8">
                  Buscar Por Nombre
                </p>

                <input
                  className="w-full md:w-72 max-h-screen py-2 md:py-5 pl-12 text-sm border outline-none rounded-xl"
                  type="text"
                  placeholder="Buscar...."
                  value={name}
                  onChange={handleSearchName}
                />
              </div>

              <div className="mb-4 md:mb-0">
                <FontAwesomeIcon
                  icon="search"
                  className="absolute text-sm ml-3 mt-1 text-black"
                  scale="2"
                />
                <p className="text-sm font-semibold text-gray-800 ml-8 md:ml-8">
                  Buscar Por Teléfono
                </p>

                <input
                  className="w-full md:w-72 max-h-screen py-2 md:py-5 pl-12 text-sm border outline-none rounded-xl"
                  type="text"
                  placeholder="Buscar...."
                  value={phone}
                  onChange={handleSearchPhone}
                />
              </div>

              <div className="mb-4 md:mb-0 ml-6">
                <p className="text-sm font-semibold text-gray-800 ml-0 md:ml-2">
                  Cantidad a mostrar
                </p>
                <select
                  className="w-full md:w-72 max-h-screen py-2 md:py-5 pl-12 text-sm border outline-none rounded-xl"
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
                <thead className="text-xs text-black uppercase bg-gray-50  dark:text-white">
                  <tr className="bg-black text-white">
                    <th className="py-2 px-4">Id</th>
                    <th className="py-2 px-4">Nombre</th>
                    <th className="py-2 px-4">Teléfono</th>
                    <th className="py-2 px-4">Carro</th>
                    <th className="py-2 px-4">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {client &&
                    client.map((client) => (
                      <tr key={client.id}>
                        <td className="py-2 px-4 font-semibold text-center">
                          {client.id}
                        </td>
                        <td className="py-2 px-4 font-normal text-center">
                          {client.name}
                        </td>
                        <td className="py-2 px-4 font-normal text-center">
                          {client.phone}
                        </td>
                        <td className="py-2 px-4 font-normal text-center">
                          {client.car.color}, {client.car.brandId},{" "}
                          {client.car.modelId}
                        </td>
                        <td className="py-2 px-4 font-normal text-center">
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
                              className="text-red-500 border border-red-600 rounded-3xl"
                            >
                              <MdDelete size={37}></MdDelete>
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
              <div className="bg-white rounded-xl shadow p-6 sm:p-4 lg:p-20 w-full max-w-md">
                <RiDeleteBin6Line className="mx-auto text-red-500" size={90} />
                <h3 className="text-2xl font-black text-center mb-4 ">
                  Eliminar Registro?
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-4">
                  Esta seguro de eliminar el registro esta opción no se puede
                  revertir.
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={confirmDelete}
                    className="bg-red-700 hover:bg-red-600 text-white  py-2 px-2 rounded-2xl"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={cancelDelete}
                    className="bg-gray-900 hover:bg-black text-white font-bold py-2 px-2 rounded-2xl ml-4"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="pagination-controls flex items-center justify-center space-x-4">
            <button
              className={` border-none p-1 ${
                pagination_client.currentPage === 1
              }`}
              onClick={handlePrev}
              disabled={pagination_client.currentPage === 1}
            >
              <TiMediaPlayReverse className="text-black w-14 h-14" />
            </button>
            <div className="relative flex items-center">
              <span className="w-8 h-9 absolute ml-4 mt-2 text-white">
                {" "}
                {pagination_client.currentPage}
              </span>
              <FaCircle className="w-10 h-14 mr-1 text-black " />
            </div>

            <button
              className={` ${
                pagination_client.currentPage === pagination_client.totalPage
              }`}
              onClick={handleNext}
              disabled={
                pagination_client.currentPage === pagination_client.totalPage
              }
            >
              <TiMediaPlay className="text-black w-14 h-14" />
            </button>
          </div>
        </>
      </Layout>
    </>
  );
}
