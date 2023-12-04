import React, { useState } from "react";
import useClientStore from "../../store/client.store";
import useCarStore from "../../store/car.store";
import { FaRegEdit } from "react-icons/fa";

const UpdateClient = ({
  id,
  nameClient,
  phoneClient,
  newCarId,
}: {
  id: number;
  nameClient: string;
  phoneClient: string;
  newCarId: number;
}) => {
  const { car, OnGetCar } = useCarStore();
  const { OnUpdateClient } = useClientStore();
  const [name, setName] = useState(nameClient);
  const [phone, setPhone] = useState(phoneClient);
  const [cars, setCar] = useState(newCarId);
  const [isOpenModal, setIsOpenModal] = useState(false);

  React.useEffect(() => {
    OnGetCar();
  }, []);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setName(name);
    setPhone(phone);
    setCar(newCarId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCar(Number(e.target.value));
  };

  const handleSubmit = async () => {
    if (name.trim() !== "") {
      const updateclient = {
        id: id,
        name: name,
        phone: phone,
        carId: cars,
      };

      await OnUpdateClient(id, updateclient);
      closeModal();
    }
  };
  return (
    <div>
      <button
        onClick={openModal}
        className="flex justify-center py-2 px-2 text-green-600 bg-white"
      >
        <FaRegEdit size={22}></FaRegEdit>
      </button>

      {isOpenModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <span onClick={closeModal}></span>
            <h3 className="text-xl font-semibold mb-4">Actualizar Cliente</h3>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block font-semibold mb-2">
                  Nombre:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nombre"
                  value={nameClient}
                  onChange={handleInputChange}
                  className="w-full border border-black rounded-lg px-3 py-2 mb-4 bg-white"
                />
                <label htmlFor="phone" className="block font-semibold mb-2">
                  Telelfono:
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Telefono"
                  value={phoneClient}
                  onChange={handleInputChange}
                  className="w-full border border-black rounded-lg px-3 py-2 mb-4 bg-white"
                />
                <label htmlFor="carId" className="block font-semibold mb-2">
                  Carro:
                </label>
                <select
                  id="carId"
                  name="carId"
                  onChange={handleSelectChange}
                  value={cars}
                  className="w-full border border-black rounded-lg px-3 py-2 mb-4 bg-white"
                >
                  <option value="">Seleccione un Carro</option>
                  {car.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.serialnumber}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 text-black bg-blue-600 text-sm font-medium rounded-md"
                >
                  Guardar
                </button>
                <button
                  onClick={closeModal}
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md ml-2"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default UpdateClient;
