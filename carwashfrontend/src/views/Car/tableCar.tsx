import { useEffect, useState } from "react";
import useCarStore from "../../store/car.store";
import Layout from "../../components/Layout";
import CreateCar from "./createCar";
import UpdateCar from "./updateCar";
import { FaTrash } from "react-icons/fa";

export default function TableCar(){
  const [carDelete,SetCarDelete]= useState<{
    id:number, colorCar: string
  }|null>(null);
  const { OnGetCar, OnDeleteCar, cars } = useCarStore();

  useEffect(() => {
    OnGetCar();
  }, []);

  const handleDelete = (id: number, colorCar: string) => {
    SetCarDelete({ id, colorCar });
  };

  const confirmDelete = () => {
    if (carDelete) {
      OnDeleteCar(carDelete.id);
      // toast.success(`The user has been successfully deleted`,{
      //     position: 'top-right',
      //     autoClose: 0,
      // });

      SetCarDelete(null);
    }
  };

  const cancelDelete = () => {
    SetCarDelete(null);
  };

  return (
    <>
      <Layout>
        <>
          <div className=" p-10 w-full">
                <CreateCar />
                <div className="flex justify-center p-8">
                  <table className="min-w-full">
                    <thead className="text-xs text-black uppercase bg-gray-50  dark:text-white">
                      <tr className="dark:bg-blue-500 text-white">
                        <th className="py-2 px-4">Id</th>
                        <th className="py-2 px-4">Marca</th>
                        <th className="py-2 px-4">Modelo</th>
                        <th className="py-2 px-4">Color</th>
                        <th className="py-2 px-4">Numero de Serie</th>
                        <th className="py-2 px-4">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cars.map((car) => (
                          <tr key={car.id}>
                            <td className="py-2 px-4 whitespace-nowrap text-center">
                              {car.id}
                            </td>
                            <td className="py-2 px-4 whitespace-nowrap text-center">
                              {car.brand.type}
                            </td>
                            <td className="py-2 px-4 whitespace-nowrap text-center">
                              {car.model.typemodel}
                            </td>
                            <td className="py-2 px-4 whitespace-nowrap text-center">
                              {car.color}
                            </td>
                            <td className="py-2 px-4 whitespace-nowrap text-center">
                              {car.serialnumber}
                            </td>
                            <td className="py-2 px-4 whitespace-nowrap text-center">
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