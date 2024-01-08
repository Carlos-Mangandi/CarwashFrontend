import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import useClientStore from "../../store/client.store";
import useCarStore from "../../store/car.store";
import { ICreateClient } from "../../types/client.types";

const CreateClient = () => {
  const { cars, OnGetCar } = useCarStore();
  const { OnCreateClient } = useClientStore();
  const [isOpenModal, setOpenModal] = useState(false);

  React.useEffect(() => {
    OnGetCar("");
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
      alert("error");
      return;
    }

    try {
      await OnCreateClient(client);
      closeModal();
    } catch (error) {
      console.error("Error creating user: ", error);
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
            <div className="bg-white rounded-lg shadow-lg p-6 h-full w-96 absolute right-0">
              <br />
              <br />
              <span onClick={closeModal}></span>
              <h3 className="text-xl text-center font-semibold mb-8">
                Nuevo Cliente
              </h3>

              <form>
                <div className="mb-3">
                  <label className="text-black font-normal flex justify-start">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={client.name}
                    onChange={handleInputChange}
                    className="font-normal w-full text-black border border-black rounded-lg px-3 py-2 mb-4"
                  />
                  <label className="text-black font-normal flex justify-start">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={client.phone}
                    onChange={handleInputChange}
                    className="font-normal w-full text-black border border-black rounded-lg px-3 py-2 mb-8"
                  />

                  <label className="text-black font-normal flex justify-start">
                    Seleccionar un Carro
                  </label>

                  <select
                    name="carId"
                    className="font-normal w-full border border-black rounded-lg px-3 py-2 mb-4"
                    value={client.carId}
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option value="">Todos los Carros</option>
                    {cars.map((car) => (
                      <option key={car.id} value={car.id}>
                        {car.brandId}, {car.modelId},{car.serialnumber},{" "}
                        {car.color}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 text-black bg-blue-600 font-medium rounded-md"
                  >
                    GUARDAR
                  </button>

                  <button
                    onClick={closeModal}
                    type="button"
                    className="px-4 py-2 text-black bg-red-600  font-medium rounded-md ml-2"
                  >
                    CANCELAR
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

export default CreateClient;
