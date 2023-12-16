import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import useCarWashStore from "../../store/carwash.store";
import CreateCarWash from "./createCarWash";
import { MdDelete } from "react-icons/md";
import UpdateCarWash from "./updateCarWash";
import { AiOutlineZoomIn } from "react-icons/ai";


function TableCarWash() {
  const [carwashDelete, setCarWashDelete] = useState<{
    id: number;
    typeCarwash: string;
  } | null>(null);

  const { OnGetCarWash, OnDeleteCarWash, carWash } = useCarWashStore();

  useEffect(() => {
    OnGetCarWash('');
  }, []);

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

  const handleSearch = (carwash="")=>{
    OnGetCarWash(carwash)
  }

  return (
    <>
      <Layout>
        <>
          <div className=" p-9 w-full">
            <CreateCarWash />
            <div className="flex justify-start p-2 items-center text-gray-400 focus-within:text-gray-400">
            <AiOutlineZoomIn className="w-5 h-5 absolute ml-3" />
          <input className="pr-3 pl-10 py-2 font-semibold placeholder-gray-400  rounded-2xl border-none ring-2 ring-gray-400 focus:ring-gray-600 focus:ring-2 "
            type="text"
            placeholder="Buscar...."
            onChange={(e)=>{
              handleSearch(e.target.value)
            }}
            />
            </div>
            <div className="flex justify-center p-8">
              <table className="min-w-full">
                <thead className="text-xs text-black uppercase bg-gray-50  dark:text-white">
                  <tr className="bg-[#0e0e0e] text-white">
                    <th className="py-2 px-4">Id</th>
                    <th className="py-2 px-4">Servicio</th>
                    <th className="py-2 px-4">Precio</th>
                    <th className="py-2 px-4">Cantidad</th>
                    <th className="py-2 px-4">Cliente</th>
                    <th className="py-2 px-4">Total</th>
                    <th className="py-2 px-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {carWash.map((carwash) => (
                      <tr key={carwash.id}>
                        <td className="py-2 px-4 whitespace-nowrap text-center">
                          {carwash.id}
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap text-center">
                          {carwash.type}
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap text-center">
                          {carwash.price}
                        </td>

                        <td className="py-2 px-4 whitespace-nowrap text-center">
                          {carwash.amount}
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap text-center">
                          {carwash.client.name}
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap text-center">
                          {carwash.total}
                        </td>

                        <td className="py-2 px-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center space-x-2">
                          <UpdateCarWash
                            id={carwash.id}
                            newClientId={carwash.clientId}
                            serviceType={carwash.type}
                            priceService={carwash.price}
                            amountService={carwash.amount}
                          />

                          <button
                            onClick={() =>
                              handleDelete(carwash.id, carwash.type)
                            }
                            className="text-red-500 border border-red-600 rounded-2xl"
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

          {carwashDelete && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <p>
                  Esta seguro de eliminar el servicio? "
                  {carwashDelete.typeCarwash}
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
export default TableCarWash;