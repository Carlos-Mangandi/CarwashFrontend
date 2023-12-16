import React, { useState } from "react";
import useCarStore from "../../store/car.store";
import useBrandStore from "../../store/brand.store";
import useModelStore from "../../store/model.store";
import { FaPlus } from "react-icons/fa";
import { ICreateCar } from "../../types/car.types";

const CreateCar = () => {
  const { brands, OnGetBrands } = useBrandStore();
  const { models, OnGetModels } = useModelStore();
  const { OnCreateCar } = useCarStore();
  const [isOpenModal, setOpenModal] = useState(false);

  React.useEffect(() => {
    OnGetBrands('');
    OnGetModels('');
  }, [OnGetBrands, OnGetModels]);
 

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
    if (
      car.brandId === 0 ||
      car.modelId === 0 ||
      !car.color ||
      !car.serialnumber
    ) {
      alert("error");
      return;
    }

    try {
      await OnCreateCar(car);
      closeModal();
    } catch (error) {
      console.error("Error creating user: ", error);
    }
  };

  return (
    <>
      <div className="flex justify-start opacity-100">
        <button
          onClick={openModal}
          className="flex justify-items-start m-5  py-4 px-4   rounded-full bg-green-500 text-white"
        >
          <FaPlus></FaPlus>
        </button>
        {isOpenModal && (
          <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
            <div className="bg-white w-full h-full fixed top-0 left-0 flex items-center justify-center">
              <div className="bg-white w-96 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-medium mb-4 text-center">
                  Nuevo Cliente
                </h3>
                <form>
                  <div className="mb-3">
                    <select
                      name="brandId"
                      className="w-full border border-black rounded-lg px-3 py-2 mb-4"
                      value={car.brandId}
                      onChange={(e) => handleInputChange(e)}
                    >
                      <option value="">Selecciona Marca</option>
                      {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {brand.type}
                        </option>
                      ))}
                    </select>
                    <select
                      name="modelId"
                      className="w-full border border-black rounded-lg px-3 py-2 mb-4"
                      value={car.modelId}
                      onChange={(e) => handleInputChange(e)}
                    >
                      <option value="">Seleccione Modelo</option>
                      {models.map((model) => (
                        <option key={model.id} value={model.id}>
                          {model.typemodel}
                        </option>
                      ))}
                    </select>
                    <label className="text-black font-semibold flex justify-center">
                      Color
                    </label>
                    <input
                      type="text"
                      name="color"
                      placeholder="Color"
                      value={car.color}
                      onChange={handleInputChange}
                      className="w-full text-black border border-black rounded-lg px-3 py-2 mb-4"
                    />
                    <label className="text-black font-semibold flex justify-center">
                      Numero de Serie
                    </label>

                    <input
                      type="text"
                      name="serialnumber"
                      placeholder="Numero de Serie"
                      value={car.serialnumber}
                      onChange={handleInputChange}
                      className="w-full text-black border border-black rounded-lg px-3 py-2 mb-4"
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-blue-500  font-medium rounded-md"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={closeModal}
                      type="button"
                      className="px-4 py-2 font-medium rounded-md bg-red-500 text-black ml-2"
                    >
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

export default CreateCar;
