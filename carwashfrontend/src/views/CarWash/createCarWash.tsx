import React, { useState } from "react";
import useCarWashStore from "../../store/carwash.store";
import useClientStore from "../../store/client.store";
import { ICreateCarWash } from "../../types/carwash.types";
import { FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const CreateCarWash = () => {
  const { client, OnGetClient } = useClientStore();
  const { OnCreateCarWash } = useCarWashStore();
  const [isOpenModal, setOpenModal] = useState(false);

  React.useEffect(() => {
    OnGetClient(1,5,"");
  }, []);

  const [carwash, SetCarWash] = useState<ICreateCarWash>({
    type: "",
    price: 0,
    amount: 0,
    clientId: 0,
  });

  const openModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    (carwash.amount = 0),
      (carwash.price = 0),
      (carwash.type = ""),
      (carwash.clientId = 0),
      setOpenModal(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    SetCarWash({
      ...carwash,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (
      !carwash.type ||
      carwash.price === 0 ||
      carwash.amount === 0 ||
      carwash.clientId === 0
    ) {
      toast.error("Todos los campos son requeridos");
      return;
    }

    try {
      await OnCreateCarWash(carwash);
      closeModal();
      toast.success("El servicio se creo exitosamente");
    } catch (error) {
      console.error("Error al crear el servicio: ", error);
      toast.error("Error al crear el servicio");
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
          <div className="bg-white rounded-lg shadow-lg p-8 w-96">
            <div className="flex justify-end">
              <span className="cursor-pointer" onClick={closeModal}>
                &#x2715;
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-6 text-center">Nuevo CarWash</h3>
            <form>
              <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Tipo de Servicio.</label>
                <input
                  type="text"
                  name="type"
                  value={carwash.type}
                  onChange={handleInputChange}
                  className="relative flex-1 flex-grow flex-shrink w-full px-3 py-4 text-base text-gray-500 border border-gray-200 rounded shadow-sm shadow-gray-100 focus:outline-none"
                />  
                 <label className="block text-gray-700 font-semibold mb-2">Precio</label>
                <input
                  type="number"
                  name="price"
                  value={carwash.price===0?"":carwash.price}
                  onChange={handleInputChange}
                  className="relative flex-1 flex-grow flex-shrink w-full px-3 py-4 text-base text-gray-500 border border-gray-200 rounded shadow-sm shadow-gray-100 focus:outline-none"
                />
                 <label className="block text-gray-700 font-semibold mb-2">Cantidad</label>
                <input
                  type="number"
                  name="amount"
                  value={carwash.amount===0?"":carwash.amount}
                  onChange={handleInputChange}
                  className="relative flex-1 flex-grow flex-shrink w-full px-3 py-4 text-base text-gray-500 border border-gray-200 rounded shadow-sm shadow-gray-100 focus:outline-none"
                />
                <label className="block text-gray-700 font-semibold mb-2">Seleccione un Cliente</label>
                <select
                  name="clientId"
                  className="relative flex-1 flex-grow flex-shrink w-full px-3 py-4 text-base text-gray-500 border border-gray-200 rounded shadow-sm shadow-gray-100 focus:outline-none"
                  value={carwash.clientId}
                  onChange={(e) => handleInputChange(e)}
                                >
                  <option value="">Todos los Clientes</option>
                  {client&& client.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
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
export default CreateCarWash;
