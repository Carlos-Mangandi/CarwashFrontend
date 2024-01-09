import React, { useState } from "react";
import useCarStore from "../../store/car.store";
import useBrandStore from "../../store/brand.store";
import useModelStore from "../../store/model.store";
import { FaMarker } from "react-icons/fa6";

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
  const { brands, OnGetBrands } = useBrandStore();
  const { models, OnGetModels } = useModelStore();
  const { OnUpdateCar } = useCarStore();
  const [serialnumber, setSerialNumber] = useState(serialNumber);
  const [colors, setColors] = useState(color);
  const [brand, setBrand] = useState(newBrandId);
  const [model, setModel] = useState(newModelId);
  const [isOpenModal, setIsOpenModal] = useState(false);

  React.useEffect(() => {
    OnGetBrands("");
    OnGetModels("");
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
  const handleInputChangeC = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColors(e.target.value);
  };
  const handleSelectChangeB = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBrand(Number(e.target.value));
  };
  const handleSelectChangeM = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setModel(Number(e.target.value));
  };

  const handleSubmit = async () => {
    if (serialnumber.trim() !== "") {
      const updateCar = {
        id: id,
        brandId: brand,
        modelId: model,
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
        className="flex justify-center py-1 px-1 text-green-600"
      >
        <FaMarker size={26}></FaMarker>
      </button>

      {isOpenModal && (
        <div className="fixed inset-0 flex items-center justify-end z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 h-full w-96 absolute right-0">
            <span onClick={closeModal}></span>
            <h3 className="text-xl font-semibold mb-4">Actualizar Carro</h3>
            <form>
              <label className="block font-normal text-start mb-2">Marca</label>
              <div className="mb-4">
                <select
                  id="brandId"
                  name="brandId"
                  onChange={handleSelectChangeB}
                  value={brand}
                  className="w-full bg-white border border-black rounded-lg px-3 py-2 mb-4"
                >
                  <option value="" disabled>
                    Seleccione una Marca
                  </option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.type}
                    </option>
                  ))}
                </select>
                <div className="mb-4">
                  <label className="block font-normal text-start">Modelo</label>
                  <select
                    id="modelId"
                    name="modelId"
                    onChange={handleSelectChangeM}
                    value={model}
                    className="w-full bg-white border border-black rounded-lg px-3 py-2 mb-4"
                  >
                    <option value="" disabled>
                      Seleccione un Modelo
                    </option>
                    {models.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.typemodel}
                      </option>
                    ))}
                  </select>
                </div>

                <label className="block font-normal text-start">Color</label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={colors}
                  onChange={handleInputChangeC}
                  className="w-full bg-white border border-black rounded-lg px-3 py-2 mb-4"
                />
                <div className="mb-5">
                  <label className="block font-normal text-start">
                    Número de Serie
                  </label>
                  <input
                    type="text"
                    id="serialnumber"
                    name="serialnumber"
                    value={serialnumber}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-black rounded-lg px-3 py-2 mb-4"
                  />
                </div>
              </div>
              <div className="flex justify-center">
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
