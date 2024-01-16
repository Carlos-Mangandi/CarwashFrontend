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
        className="flex justify-center py-2 px-2 text-green-600 border border-green-600 rounded-3xl"
      >
        <FaMarker size={23}></FaMarker>
      </button>

      {isOpenModal && (
        <div className="fixed inset-0 flex items-center justify-end z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 h-full w-96 absolute right-0">
            <span onClick={closeModal}></span>
            <h3 className="text-xl font-semibold mb-4">Actualizar Cliente</h3>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block font-normal  text-start mb-2"
                >
                  Nombre:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                  className="w-full border border-black rounded-lg px-3 py-2 mb-4 bg-white"
                />
                <label
                  htmlFor="phone"
                  className="block font-normal text-start mb-2"
                >
                  Teléfono:
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={handleInputChangePhone}
                  className="w-full border border-black rounded-lg px-3 py-2 mb-4 bg-white"
                />
                <label
                  htmlFor="carId"
                  className="block font-normal text-start mb-2"
                >
                  Carro:
                </label>
                <select
                  id="carId"
                  name="carId"
                  onChange={handleSelectChange}
                  value={car}
                  className="w-full border border-black rounded-lg px-3 py-2 mb-4 bg-white"
                >
                  <option value="" disabled>
                    Seleccione un Carro
                  </option>
                  {cars.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.brandId}, {car.modelId}, {car.color},{" "}
                      {car.serialnumber}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 text-black bg-blue-600 text-sm font-medium rounded-md"
                >
                  Guardar
                </button>
                <button
                  onClick={closeModal}
                  type="button"
                  className="px-4 py-2 bg-red-600 text-black text-sm font-medium rounded-md ml-2"
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
