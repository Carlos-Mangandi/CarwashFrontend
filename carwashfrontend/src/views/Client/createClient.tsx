import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { BsSave2Fill } from "react-icons/bs";
import useClientStore from "../../store/client.store";
import useCarStore from "../../store/car.store";
import { ICreateClient } from "../../types/client.types";

export default function CreateClient() {
  const { car } = useCarStore();
  const { OnCreateClient } = useClientStore();
  const [isOpenModal, setOpenModal] = useState(false);
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
    try {
      await OnCreateClient(client);
      closeModal();
    } catch (error) {
      console.error("Error creating user: ", error);
    }
  };
  return (
    <>
      <div className="p-2 flex items-center justify-between opacity-100">
        <button
          onClick={openModal}
          className="bg-blue-500 text-white font-bold py-4 px-4 m-3 rounded-full flex justify-center"
        >
          <FaPlus></FaPlus>
        </button>
        {isOpenModal && (
          <div className="fixed inset-0 flex items-center justify-around z-10 bg-black bg-opacity-50">
            <div className="bg-white w-100 rounded-lg shadow-lg p-10">
              <h3 className="text-lg font-medium mb-4 text-center">
                Nuevo Cliente
              </h3>
              <form>
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={client.name}
                    onChange={handleInputChange}
                    className="w-full text-black border border-black bg-white rounded-lg px-3 py-2 mb-4"
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Telefono"
                    onChange={handleInputChange}
                    value={client.phone}
                    className="w-full text-black  border border-black bg-white rounded-lg px-3 py-2 mb-4"
                  />
                  <select
                    name="carId"
                    onChange={(e) => handleInputChange(e)}
                    value={client.carId}
                    className="w-full  border border-black bg-white rounded-lg px-3 py-2 mb-4"
                  >
                    <option value="">Seleccione un Carro</option>
                    {car.map((car) => (
                      <option key={car.id} value={car.id}>
                        {car.brand.type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 text-black bg-blue-600 text-sm font-medium rounded-md"
                  >
                    <BsSave2Fill /> &nbsp;&nbsp;&nbsp;
                    <span>Guardar</span>
                  </button>
                  &nbsp;&nbsp;&nbsp;
                  <button
                    onClick={closeModal}
                    type="button"
                    className="px-4 py-2 bg-gray-200 text-black text-sm font-medium rounded-md ml-2"
                  >
                    <MdCancel /> &nbsp;&nbsp;
                    <span>Cancelar</span>
                  </button>
                  &nbsp;&nbsp;
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
