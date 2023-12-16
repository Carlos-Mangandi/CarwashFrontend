import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import useClientStore from "../../store/client.store";
import useCarStore from "../../store/car.store";
import { ICreateClient } from "../../types/client.types";

const CreateClient = () => {
  const { cars, OnGetCar } = useCarStore();
  const {OnCreateClient} = useClientStore();
  const [isOpenModal, setOpenModal] = useState(false);

  React.useEffect(() => {
    OnGetCar('');
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
    if (!client.name || !client.phone ||  client.carId === 0) {
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
      <div className="flex justify-start opacity-100">
        <button onClick={openModal} className="flex justify-items-start m-5  py-4 px-4   rounded-full bg-green-500 text-white">
          <FaPlus></FaPlus>
        </button>
        {isOpenModal && (
          <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
            <div className="bg-white w-full h-full fixed top-0 left-0 flex items-center justify-center">
              <div className="bg-white w-96 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-medium mb-4 text-center">Nuevo Cliente</h3>
                <form>
                  <div className="mb-3">
                    <label className="text-black font-semibold flex justify-center">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={client.name}
                    onChange={handleInputChange}
                    className="w-full text-black border border-black rounded-lg px-3 py-2 mb-4"
                  />
                 <label className="text-black font-semibold flex justify-center">Telefono</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Telefono"
                    value={client.phone}
                    onChange={handleInputChange}
                    className="w-full text-black border border-black rounded-lg px-3 py-2 mb-8"
                  />
                  <select name="carId"
                    className="w-full border border-black rounded-lg px-3 py-2 mb-4"
                    value={client.carId}
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option value="" >
                      Seleccione un Carro 
                    </option>
                    {cars.map((car) => (
                      <option key={car.id} value={car.id}>
                        {car.color}, {car.serialnumber}
                      </option>
                    ))}
                  </select>
                </div>
                  <div className="flex justify-center">
                    <button onClick={handleSubmit} className="px-4 py-2 text-black bg-blue-600 font-medium rounded-md">
                    Guardar
                    </button>

                    <button onClick={closeModal} type="button"  className="px-4 py-2 text-black bg-red-600  font-medium rounded-md ml-2">
                    Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateClient;