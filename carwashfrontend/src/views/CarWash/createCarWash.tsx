import React, { useState } from "react";
import useCarWashStore from "../../store/carwash.store";
import useClientStore from "../../store/client.store";
import { ICreateCarWash } from "../../types/carwash.types";
import { FaPlus } from "react-icons/fa";

const CreateCarWash = () => {
  const { client, OnGetClient } = useClientStore();
  const { OnCreateCarWash } = useCarWashStore();
  const [isOpenModal, setOpenModal] = useState(false);

  React.useEffect(() => {
    OnGetClient("");
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
      alert("error");
      return;
    }

    try {
      await OnCreateCarWash(carwash);
      closeModal();
    } catch (error) {
      console.error("Error creating carwash: ", error);
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
            <div className="justify-middle bg-white rounded-lg shadow-lg p-6 h-full w-96 absolute right-0">
              <br />
              <br />
              <h3 className="text-lg font-semibold mb-4 text-center">
                Nuevo Servicio
              </h3>
              <form>
                <div className="mb-3">
                  <label className="text-black font-normal flex justify-start">
                    Servicio
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={carwash.type}
                    onChange={handleInputChange}
                    className="font-normal w-full text-black border border-black rounded-lg px-3 py-2 mb-4"
                  />

                  <label 
                    className="text-black font-normal flex justify-start"
                  >
                    Precio
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={carwash.price}
                    onChange={handleInputChange}
                    className="font-normal w-full text-black border border-black rounded-lg px-3 py-2 mb-8"
                  />

                  <label 
                    className="text-black font-normal flex justify-start"
                  >
                    Cantidad
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={carwash.amount}
                    onChange={handleInputChange}
                    className="font-normal w-full text-black border border-black rounded-lg px-3 py-2 mb-8"
                  />

                  <label 
                    className="text-black font-normal flex justify-start"
                  >
                    Cliente
                  </label>
                  <select
                    name="clientId"
                    className="font-normal w-full border border-black rounded-lg px-3 py-2 mb-4"
                    value={carwash.clientId}
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option value="">Seleccione un Cliente</option>
                    {client.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 text-black bg-blue-600 font-medium rounded-md"
                  >
                    Guardar
                  </button>

                  <button
                    onClick={closeModal}
                    type="button"
                    className="px-4 py-2 text-black bg-red-600  font-medium rounded-md ml-2"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default CreateCarWash;