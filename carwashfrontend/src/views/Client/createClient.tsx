import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import useClientStore from "../../store/client.store";
import useCarStore from "../../store/car.store";
import { ICreateClient } from "../../types/client.types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateClient = () => {
  const { cars, OnGetCar } = useCarStore();
  const { OnCreateClient } = useClientStore();
  const [isOpenModal, setOpenModal] = useState(false);

  React.useEffect(() => {
    OnGetCar(1,5,"");
  }, []);

  const [client, setClient] = useState<ICreateClient>({
    name: "",
    phone: "",
    carId: 0,
  });

  const openModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setClient({
      ...client,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (!client.name || !client.phone || client.carId === 0) {
      toast.error("Todos los campos son requeridos");
      return;
    }

    try {
      await OnCreateClient(client);
      closeModal();
      toast.success("Cliente creado exitosamente");
    } catch (error) {
      console.error("Error al crear el cliente: ", error);
      toast.error("Error al crear cliente");
    }
  };

  return (
    <>
      <div>
        <button
          onClick={openModal}
          title="AGREGAR"
          className="flex justify-items-end m-5 py-4 px-4 rounded-full bg-green-500 text-white"
        >
          <FaPlus></FaPlus>
        </button>
        {isOpenModal && (
          <div className="fixed inset-0 flex items-center justify-end z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-12 w-96">
            <div className="flex justify-end">
              <span className="cursor-pointer" onClick={closeModal}>
                &#x2715;
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-6 text-center">Nuevo Cliente</h3>
            <form>
              <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={client.name}
                  onChange={handleInputChange}
                  className="relative flex-1 flex-grow flex-shrink w-full px-3 py-4 text-base text-gray-500 border border-gray-200 rounded shadow-sm shadow-gray-100 focus:outline-none"
                />
                 <label className="block text-gray-700 font-semibold mb-2">Teléfono</label>
                <input
                  type="text"
                  name="phone"
                  value={client.phone}
                  onChange={handleInputChange}
                  className="relative flex-1 flex-grow flex-shrink w-full px-3 py-4 text-base text-gray-500 border border-gray-200 rounded shadow-sm shadow-gray-100 focus:outline-none"
                />
                <label className="block text-gray-700 font-semibold mb-2">Seleccionar Carro</label>
                <select
                  name="carId"
                  className="relative flex-1 flex-grow flex-shrink w-full px-3 py-4 text-base text-gray-500 border border-gray-200 rounded shadow-sm shadow-gray-100 focus:outline-none"
                  value={client.carId}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="">Todos los modelos</option>
                  {cars&&cars.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.brand.type},{car.model.typemodel}, {car.serialnumber},{""} {car.color}
                    </option>
                  ))}
                </select>
               
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  title="GUARDAR"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-500 text-white font-medium rounded-md mr-2"
                >
                  Guardar
                </button>
                <button
                  onClick={closeModal}
                  type="button"
                  title="CANCELAR"
                  className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
        )}
      </div>

      <ToastContainer />
    </>
  );
};

export default CreateClient;
