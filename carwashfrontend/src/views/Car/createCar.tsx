import React, { useState } from "react";
import useCarStore from "../../store/car.store";
import useBrandStore from "../../store/brand.store";
import useModelStore from "../../store/model.store";
import { FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCar = () => {
  const { brands, OnGetBrands } = useBrandStore();
  const { models, OnGetModels } = useModelStore();
  const { OnCreateCar } = useCarStore();
  const [isOpenModal, setOpenModal] = useState(false);

  React.useEffect(() => {
    OnGetBrands("");
    OnGetModels("");
  }, []);

  const [car, setCar] = useState({
    brandId: 0,
    modelId: 0,
    color: "",
    serialnumber: "",
  });

  const openModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    car.color = "";
    car.serialnumber = "";
    car.brandId = 0;
    car.modelId = 0;
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
      !car.color ||
      !car.serialnumber ||
      car.brandId === 0 ||
      car.modelId === 0
    ) {
      toast.error("Todos los campos son requeridos");
      return;
    }

    try {
      await OnCreateCar(car);
      closeModal();
      toast.success("Carro creado exitosamente");
    } catch (error) {
      console.error("Error al crear carro: ", error);
    }
  };

  return (
    <>
      <div>
        <button
          onClick={openModal}
          title="AGREGAR"
          className="flex justify-items-end m-5  py-4 px-4 rounded-full bg-green-500 text-white"
        >
          <FaPlus></FaPlus>
        </button>
        {isOpenModal && (
          <div className="fixed inset-0 flex items-center justify-end z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 h-full w-96 absolute right-0">
              <span onClick={closeModal}></span>
              <h3 className="text-lg font-semibold mb-4 text-center">
                Nueva Marca
              </h3>
              <form>
                <div className="mb-3">
                  <label className="text-black font-normal justify-start">
                    Seleccionar Marca
                  </label>
                  <select
                    name="brandId"
                    className="font-normal w-full border border-black rounded-lg px-3 py-2 mb-4"
                    value={car.brandId}
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option value="">Todas las Marcas</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.type}
                      </option>
                    ))}
                  </select>

                  <label className="text-black font-normal justify-start">
                    Seleccionar Modelo
                  </label>
                  <select
                    name="modelId"
                    className="font-normal w-full border border-black rounded-lg px-3 py-2 mb-4"
                    value={car.modelId}
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option value="">Todos los modelos</option>
                    {models.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.typemodel}
                      </option>
                    ))}
                  </select>

                  <label className="text-black font-normal flex justify-start">
                    Color
                  </label>
                  <input
                    type="text"
                    name="color"
                    value={car.color}
                    onChange={handleInputChange}
                    className="font-normal w-full text-black border border-black rounded-lg px-3 py-2 mb-4"
                  />
                  <label className="text-black font-normal flex justify-start">
                    Numero de Serie
                  </label>
                  <input
                    type="text"
                    name="serialnumber"
                    value={car.serialnumber}
                    onChange={handleInputChange}
                    className="font-normal w-full text-black border border-black rounded-lg px-3 py-2 mb-4"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    title="GUARDAR"
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-500  font-medium rounded-md"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={closeModal}
                    type="button"
                    title="CANCELAR"
                    className="px-4 py-2 font-medium rounded-md bg-red-500 text-black ml-2"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateCar;
