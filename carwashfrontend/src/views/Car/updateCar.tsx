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
    OnGetBrands(1,5,"");
    OnGetModels(1,5,"");
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
        className="flex justify-center py-2 px-2 text-green-600 rounded-full
         border border-green-600"
      >
        <FaMarker size={27}></FaMarker>
      </button>

      {isOpenModal && (
        <div className="fixed inset-0 flex items-center justify-end z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-8 w-96">
          <div className="flex justify-end">
            <span className="cursor-pointer" onClick={closeModal}>
              &#x2715;
            </span>
          </div>
          <h3 className="text-xl font-semibold mb-6 text-center">Actualizar Carro</h3>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Seleccionar Marca</label>
              <select
              id="brandId"
                name="brandId"
                className="relative flex-1 flex-grow flex-shrink w-full px-3 py-4 text-base text-gray-500 border border-gray-200 rounded shadow-sm shadow-gray-100 focus:outline-none"
                value={brand} 
                onChange={handleSelectChangeB}
              >
                <option value="">Todas las Marcas</option>
                {brands&&brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.type}
                  </option>
                ))}
              </select>
      
              <label className="block text-gray-700 font-semibold mb-2">Seleccionar Modelo</label>
              <select
              id="modelId"
                name="modelId"
                className="relative flex-1 flex-grow flex-shrink w-full px-3 py-4 text-base text-gray-500 border border-gray-200 rounded shadow-sm shadow-gray-100 focus:outline-none"
                value={model}

                onChange={handleSelectChangeM}              >
                <option value="">Todos los modelos</option>
                {models&&models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.typemodel}
                  </option>
                ))}
              </select>
      
              <label className="block text-gray-700 font-semibold mb-2">Color</label>
              <input
                type="text"
                id="color"
                name="color"
                value={colors}
                onChange={handleInputChangeC}
                className="relative flex-1 flex-grow flex-shrink w-full px-3 py-4 text-base text-gray-500 border border-gray-200 rounded shadow-sm shadow-gray-100 focus:outline-none"
              />
      
              <label className="block text-gray-700 font-semibold mb-2">Numero de Serie</label>
              <input
                type="text"
                name="serialnumber"
                value={serialnumber}
                onChange={handleInputChange}
                className="relative flex-1 flex-grow flex-shrink w-full px-3 py-4 text-base text-gray-500 border border-gray-200 rounded shadow-sm shadow-gray-100 focus:outline-none"
              />
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
export default UpdateCar;
