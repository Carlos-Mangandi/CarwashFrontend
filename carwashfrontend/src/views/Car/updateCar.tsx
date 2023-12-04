import React, { useState } from "react";
import useCarStore from "../../store/car.store";
import useBrandStore from "../../store/brand.store";
import useModelStore from "../../store/model.store";
import { FaRegEdit } from "react-icons/fa";

const UpdateCar = ({
  id,
  newBrandId,
  newModelId,
  color,
  serialNumber,
}: {
  id: number;
  newBrandId: number;
  newModelId: number;
  color: string;
  serialNumber: string;
}) => {
  const { brand, OnGetBrands } = useBrandStore();
  const { model, OnGetModels } = useModelStore();
  const { OnUpdateCar } = useCarStore();
  const [serialnumber, setSerialNumber] = useState(serialNumber);
  const [brands, setBrand] = useState(newBrandId);
  const [models, setModel] = useState(newModelId);
  const [isOpenModal, setIsOpenModal] = useState(false);

  React.useEffect(() => {
    OnGetBrands();
  }, []);
  React.useEffect(() => {
    OnGetModels();
  }, []);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setSerialNumber(serialnumber);
    setBrand(newBrandId);
    setModel(newModelId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSerialNumber(e.target.value);
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBrand(Number(e.target.value));
    setModel(Number(e.target.value));
  };

  const handleSubmit = async () => {
    if (serialnumber.trim() !== "") {
      const updateCar = {
        id: id,
        brandId: brands,
        modelId: models,
        color: color,
        serialnumber: serialnumber,
      };

      await OnUpdateCar(id, updateCar);
      closeModal();
    }
  };
  return (
    <div>
      <button
        onClick={openModal}
        className="flex justify-center py-1 px-1 text-green-600 bg-white"
      >
        <FaRegEdit size={22}></FaRegEdit>
      </button>

      {isOpenModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <span onClick={closeModal}></span>
            <h3 className="text-xl font-semibold mb-4">Actualizar Carro</h3>
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="block font-semibold mb-2">
                  Marca
                </label>

                <select
                  id="brandId"
                  name="brandId"
                  onChange={handleSelectChange}
                  value={brands}
                  className="w-full bg-white border border-black rounded-lg px-3 py-2 mb-4"
                >
                  <option value="" disabled>
                    Seleccione una Marca
                  </option>
                  {brand.map((brands) => (
                    <option key={brands.id} value={brands.id}>
                      {brands.type}
                    </option>
                  ))}
                </select>
                <label htmlFor="email" className="block font-semibold mb-2">
                  Modelo
                </label>

                <select
                  id="modelId"
                  name="modelId"
                  onChange={handleSelectChange}
                  value={models}
                  className="w-full bg-white border border-black rounded-lg px-3 py-2 mb-4"
                >
                  <option value="" disabled>
                    Seleccione un Modelo
                  </option>
                  {model.map((models) => (
                    <option key={models.id} value={models.id}>
                      {models.typemodel}
                    </option>
                  ))}
                </select>
                <label htmlFor="email" className="block font-semibold mb-2">
                  Color
                </label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  placeholder="Color de Carro"
                  value={color}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-black rounded-lg px-3 py-2 mb-4"
                />
                <label htmlFor="email" className="block font-semibold mb-2">
                  Numero de Serie
                </label>
                <input
                  type="text"
                  id="serialnumber"
                  name="serialnumber"
                  placeholder="Number of serie"
                  value={serialnumber}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-black rounded-lg px-3 py-2 mb-4"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 text-black bg-blue-600 text-sm font-medium rounded-md"
                >
                  Actualizar
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
export default UpdateCar;
