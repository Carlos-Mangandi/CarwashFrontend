import { useEffect, useState } from "react";
import useCarStore from "../../store/car.store";
import Layout from "../Layout";
import CreateCar from "./createCar";
import UpdateCar from "./updateCar";
import { FaTrash } from "react-icons/fa";

export default function TableCar() {
  const { car, OnGetCar, OnDeleteCar } = useCarStore();
  const [carDelete, setCarDelete] = useState<{
    id: number;
    serialnumber: string;
  } | null>(null);

  useEffect(() => {
    OnGetCar;
  });
  const handleDelete = (id: number, serialnumber: string) => {
    setCarDelete({ id, serialnumber });
  };

  const confirmDelete = () => {
    if (carDelete) {
      OnDeleteCar(carDelete.id);

      setCarDelete(null);
    }
  };

  const cancelDelete = () => {
    setCarDelete(null);
  };

  return (
    <>
      <Layout>
        <>
          <div className="p-10 w-full">
            <CreateCar></CreateCar>
            <table className="w-full text-sm text-center rtl:text-right text-white dark:text-black hover:border-collapse">
              <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-blue-500 dark:text-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Marca
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Modelo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Color
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Numero de Serie
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {car &&
                  car.map((car) => (
                    <tr className="bg-white" key={car.id}>
                      <td className="px-6 py-4">{car.id}</td>
                      <td className="px-6 py-4">{car.brand.type}</td>
                      <td className="px-6 py-4">{car.model.typemodel}</td>
                      <td className="px-6 py-4">{car.color}</td>
                      <td className="px-6 py-4">{car.serialnumber}</td>
                      <td className="px-4 py-2 flex items-center justify-around">
                        <UpdateCar
                          id={car.id}
                          newBrandId={car.brandId}
                          newModelId={car.modelId}
                          color={car.color}
                          serialNumber={car.serialnumber}
                        />
                        <button
                          onClick={() => handleDelete(car.id, car.serialnumber)}
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
          {carDelete && (
            <div className="fixed inset-0 flex items-center justify-center ">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <p>
                  Esta seguro de querer eliminar el carro "
                  {carDelete.serialnumber}"?
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
