import { useEffect, useState } from "react";
import useCarStore from "../../store/car.store";
import Layout from "../../components/Layout";
import CreateCar from "./createCar";
import UpdateCar from "./updateCar";
import { MdDelete } from "react-icons/md";

export default function TableCar() {
  const [carDelete, SetCarDelete] = useState<{
    id: number;
    colorCar: string;
  } | null>(null);
  const { OnGetCar, OnDeleteCar, cars } = useCarStore();

  useEffect(() => {
    OnGetCar("");
  }, []);

  const handleDelete = (id: number, colorCar: string) => {
    SetCarDelete({ id, colorCar });
  };

  const confirmDelete = () => {
    if (carDelete) {
      OnDeleteCar(carDelete.id);
      SetCarDelete(null);
    }
  };

  const cancelDelete = () => {
    SetCarDelete(null);
  };
  const handleSearch = (color = "") => {
    OnGetCar(color);
  };

  return (
    <>
      <Layout>
        <>
          <div className=" p-10 w-full">
            <CreateCar />
            <div className="flex justify-start p-5 items-center text-gray-400 focus-within:text-gray-400">
              <input
                className="pr-3 pl-10 py-2 font-normal placeholder-gray-400  rounded-2xl border-none ring-2 ring-gray-400 focus:ring-gray-600 focus:ring-2 "
                type="text"
                placeholder="Buscar...."
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              />
            </div>
            <div className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-black">
              <table className="min-w-full">
                <thead className="text-xs text-black uppercase bg-gray-50  dark:text-white">
                  <tr className="bg-[#0e0e0e] text-white">
                    <th className="py-2 px-4">Id</th>
                    <th className="py-2 px-4">Marca</th>
                    <th className="py-2 px-4">Modelo</th>
                    <th className="py-2 px-4">Color</th>
                    <th className="py-2 px-4">Numero de Serie</th>
                    <th className="py-2 px-4">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {cars &&
                    cars.map((car) => (
                      <tr className="bg-white" key={car.id}>
                        <td className="py-2 px-4  text-center">{car.id}</td>
                        <td className="py-2 px-4 font-normal text-center">
                          {car.brand.type}
                        </td>
                        <td className="py-2 px-4 font-normal text-center">
                          {car.model.typemodel}
                        </td>
                        <td className="py-2 px-4 font-normal text-center">
                          {car.color}
                        </td>
                        <td className="py-2 px-4 font-normal text-center">
                          {car.serialnumber}
                        </td>
                        <td className="px-4 py-2 flex items-center justify-around">
                          <div className="flex items-center justify-center space-x-2">
                            <UpdateCar
                              id={car.id}
                              newBrandId={car.brandId}
                              newModelId={car.modelId}
                              color={car.color}
                              serialNumber={car.serialnumber}
                            />
                            <button
                              onClick={() =>
                                handleDelete(car.id, car.brand.type)
                              }
                              className="text-red-500 border border-red-600 rounded-2xl"
                            >
                              <MdDelete size={34}></MdDelete>
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
          {carDelete && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <p>
                  Esta seguro de eliminar el carro? "{carDelete.colorCar}
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
