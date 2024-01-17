import React, { useState } from "react";
import useClientStore from "../../store/client.store";
import useCarStore from "../../store/car.store";
import { FaMarker } from "react-icons/fa6";

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
  const { cars, OnGetCar } = useCarStore();
  const { OnUpdateClient } = useClientStore();
  const [name, setName] = useState(nameClient);
  const [phone, setPhone] = useState(phoneClient);
  const [car, setCar] = useState(newCarId);
  const [isOpenModal, setIsOpenModal] = useState(false);

  React.useEffect(() => {
    OnGetCar(1,5,"");
  }, [OnGetCar]);

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
  const handleInputChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCar(Number(e.target.value));
  };

  const handleSubmit = async () => {
    if (name.trim() !== "") {
      const updateClient = {
        id: id,
        name: name,
        phone: phone,
        carId: car,
      };

      await OnUpdateClient(id, updateClient);
      closeModal();
    }
  };
  return (
    <div>
      <button
        onClick={openModal}
        className="flex justify-center py-2 px-2 text-green-600 rounded-3xl border  border-green-600"
      >
        <FaMarker size={26}></FaMarker>
      </button>

      {isOpenModal && (
        <div className="fixed inset-0 flex items-center justify-end z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96">
            <div className="flex justify-end">
              <span className="cursor-pointer" onClick={closeModal}>
                &#x2715;
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-6 text-center">
              Actualizar Cliente
            </h3>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-4">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="color"
                  value={name}
                  onChange={handleInputChange}
                  className="relative flex-1 flex-grow flex-shrink w-full px-3 py-4 text-base text-gray-500 border border-gray-200 rounded shadow-sm shadow-gray-100 focus:outline-none"
                />
                <label className="block text-gray-700 font-semibold mb-4">
                  Teléfono
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={handleInputChangePhone}
                  className="relative flex-1 flex-grow flex-shrink w-full px-3 py-4 text-base text-gray-500 border border-gray-200 rounded shadow-sm shadow-gray-100 focus:outline-none"
                />
                <label className="block text-gray-700 font-semibold mb-4">
                  Seleccionar Carro
                </label>
                <select
                  id="carId"
                  name="carId"
                  className="relative flex-1 flex-grow flex-shrink w-full px-3 py-4 text-base text-gray-500 border border-gray-200 rounded shadow-sm shadow-gray-100 focus:outline-none"
                  value={car}
                  onChange={handleSelectChange}
                >
                  <option value="" disabled>
                    Todos los carros
                  </option>
                  {cars&&cars.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.brand.type},{car.model.typemodel}, {car.serialnumber}
                      ,{""} {car.color}
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
                  Actualizar
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
  );
};
export default UpdateClient;
