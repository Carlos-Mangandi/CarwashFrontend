import React, { useState } from "react";
import useCarStore from "../../store/car.store";
import useBrandStore from "../../store/brand.store";
import useModelStore from "../../store/model.store";
import { FaPlus } from "react-icons/fa";
import { BsSave2Fill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { ICreateCar } from "../../types/car.types";

export default function CreateCar() {
  const { brand } = useBrandStore();
  const { model } = useModelStore();
  const { OnCreateCar } = useCarStore();
  const [isOpenModal, setOpenModal] = useState(false);

  const [car, setCar] = useState<ICreateCar>({
    brandId: 0,
    modelId: 0,
    color: "",
    serialnumber: "",
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
    setCar({
      ...car,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await OnCreateCar(car);
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
          className="bg-blue-500 text-white font-bold py-4 px-4 m-3 rounded-full flex items-center text-center"
        >
          <FaPlus></FaPlus>
        </button>
        {isOpenModal && (
          <div className="fixed inset-0 flex items-center justify-around z-10 bg-black bg-opacity-50">
            <div className="bg-white w-100 rounded-lg shadow-lg p-10">
              <h3 className="text-lg font-medium mb-4 text-center">
                Nuevo Carro
              </h3>
              <form>
                <div className="mb-4">
                  <select
                    name="brandId"
                    onChange={(e) => handleInputChange(e)}
                    value={car.brandId}
                    className="w-full border border-black bg-white rounded-lg px-3 py-2 mb-4"
                  >
                    <option value="">Seleccione una Marca</option>
                    {brand.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.type}
                      </option>
                    ))}
                  </select>
                  <select
                    name="modelId"
                    onChange={(e) => handleInputChange(e)}
                    value={car.modelId}
                    className="w-full border border-black bg-white rounded-lg px-3 py-2 mb-4"
                  >
                    <option value="">Seleccione un Modelo</option>
                    {model.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.typemodel}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="color"
                    placeholder="Color"
                    value={car.color}
                    onChange={handleInputChange}
                    className="w-full text-black border border-black bg-white rounded-lg px-3 py-2 mb-4"
                  />
                  <input
                    type="text"
                    name="serialnumber"
                    placeholder="Numero de Serie"
                    onChange={handleInputChange}
                    value={car.serialnumber}
                    className="w-full text-black border border-black bg-white rounded-lg px-3 py-2 mb-4"
                  />
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
                    className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md ml-2"
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
