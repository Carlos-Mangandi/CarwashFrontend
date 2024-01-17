import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import useCarWashStore from "../../store/carwash.store";
import CreateCarWash from "./createCarWash";
import { MdDelete } from "react-icons/md";
import UpdateCarWash from "./updateCarWash";
import { FontAwesomeIcon } from "../../plugins/font-awesome";
import { TiMediaPlayReverse } from "react-icons/ti";
import { TiMediaPlay } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCircle } from "react-icons/fa";

function TableCarWash() {
  const [carwashDelete, setCarWashDelete] = useState<{
    id: number;
    typeCarwash: string;
  } | null>(null);

  const { OnGetCarWash, OnDeleteCarWash, carwash, pagination_carwash } =
    useCarWashStore();
  const [displayCount, setDisplayCount] = useState(5);

  useEffect(() => {
    OnGetCarWash(1, displayCount, "");
  }, [OnGetCarWash, displayCount]);

  const handleDelete = (id: number, typeCarwash: string) => {
    setCarWashDelete({ id, typeCarwash });
  };

  const confirmDelete = () => {
    if (carwashDelete) {
      OnDeleteCarWash(carwashDelete.id);

      setCarWashDelete(null);
    }
  };

  const cancelDelete = () => {
    setCarWashDelete(null);
  };

  const handleSearch1 = (carwash = "") => {
    OnGetCarWash(1, 5, carwash);
  };
  const handleDisplayCountChange = (event: { target: { value: string } }) => {
    const newDisplayCount = parseInt(event.target.value, 10);
    setDisplayCount(newDisplayCount);
  };

  const handleNext = () => {
    console.log("Current Page:", pagination_carwash.currentPage);
    console.log("Total Pages:", pagination_carwash.totalPage);

    if (pagination_carwash.currentPage < pagination_carwash.totalPage) {
      OnGetCarWash(pagination_carwash.currentPage + 1, displayCount, "");
    }
  };

  const handlePrev = () => {
    console.log("Current Page:", pagination_carwash.currentPage);
    console.log("Total Pages:", pagination_carwash.totalPage);

    if (pagination_carwash.currentPage > 1) {
      OnGetCarWash(pagination_carwash.currentPage - 1, displayCount, "");
    }
  };

  console.log("Is Prev Button Disabled:", pagination_carwash.currentPage === 1);
  console.log(
    "Is Next Button Disabled:",
    pagination_carwash.currentPage === pagination_carwash.totalPage
  );

  return (
    <>
      <Layout>
        <>
          <div className=" p-9 w-full">
            <CreateCarWash />
            <div className="flex justify-start p-5 items-center text-gray-400 focus-within:text-gray-400">
              <div className="">
                <FontAwesomeIcon
                  icon="search"
                  className="absolute text-sm ml-36 mt-1 text-black"
                  scale="2"
                />
                <p className="text-sm font-semibold text-gray-800 ml-2">
                  Buscar Por Nombre
                </p>

                <input
                  className="w-72 max-h-screen py-5 pl-12 text-sm border outline-none rounded-xl"
                  type="text"
                  placeholder="Buscar...."
                  onChange={(e) => {
                    handleSearch1(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col w-full md:w-full">
                <p className="text-sm font-semibold text-gray-800 ml-56">
                  Cantidad a mostrar
                </p>
                <select
                  className=" w-80 ml-56  p-5 mt-1 text-sm font-semibold border outline-none rounded-xl"
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
                  <tr className="bg-[#0e0e0e] text-white">
                    <th className="py-2 px-4">Id</th>
                    <th className="py-2 px-4">Cliente</th>
                    <th className="py-2 px-4">Servicio</th>
                    <th className="py-2 px-4">Cantidad</th>
                    <th className="py-2 px-4">Precio</th>
                    <th className="py-2 px-4">Total</th>
                    <th className="py-2 px-4">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {carwash &&
                    carwash.map((carwash) => (
                      <tr key={carwash.id}>
                        <td className="py-2 px-4 whitespace-nowrap text-center">
                          {carwash.id}
                        </td>
                        <td className="py-2 px-4 font-normal text-center">
                          {carwash.client.name}
                        </td>
                        <td className="py-2 px-4 font-normal text-center">
                          {carwash.type}
                        </td>
                        <td className="py-2 px-4 font-normal text-center">
                          {carwash.amount}
                        </td>
                        <td className="py-2 px-4 font-normal text-center">
                          $ {carwash.price}
                        </td>
                        <td className="py-2 px-4 font-normal text-center">
                          $ {carwash.total}
                        </td>

                        <td className="py-2 px-4font-normal text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <UpdateCarWash
                              id={carwash.id}
                              newClientId={carwash.clientId}
                              serviceType={carwash.type}
                              amountService={carwash.amount}
                              priceService={carwash.price}
                            />

                            <button
                              onClick={() =>
                                handleDelete(carwash.id, carwash.type)
                              }
                              className="text-red-500 border border-red-600 rounded-3xl"
                            >
                              <MdDelete size={38}></MdDelete>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {carwashDelete && (
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
                pagination_carwash.currentPage === 1
              }`}
              onClick={handlePrev}
              disabled={pagination_carwash.currentPage === 1}
            >
              <TiMediaPlayReverse className="text-black w-14 h-14" />
            </button>
            <div className="relative flex items-center">
              <span className="w-8 h-9 absolute ml-4 mt-2 text-white">
                {" "}
                {pagination_carwash.currentPage}
              </span>
              <FaCircle className="w-10 h-14 mr-1 text-black " />
            </div>

            <button
              className={` ${
                pagination_carwash.currentPage === pagination_carwash.totalPage
              }`}
              onClick={handleNext}
              disabled={
                pagination_carwash.currentPage === pagination_carwash.totalPage
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
export default TableCarWash;
