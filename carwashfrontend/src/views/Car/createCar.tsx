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
    OnGetBrands(1,5,"");
    OnGetModels(1,5,"");
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
        <div className="bg-white rounded-lg shadow-lg p-8 w-96">
          <div className="flex justify-end">
            <span className="cursor-pointer" onClick={closeModal}>
              &#x2715;
            </span>
          </div>
          <h3 className="text-xl font-semibold mb-6 text-center">Nueva Carro</h3>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Seleccionar Marca</label>
              <select
                name="brandId"
                className="relative flex-1 flex-grow flex-shrink w-full px-3 py-4 text-base text-gray-500 border border-gray-200 rounded shadow-sm shadow-gray-100 focus:outline-none"
                value={car.brandId}
                onChange={(e) => handleInputChange(e)}
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
                name="modelId"
                className="relative flex-1 flex-grow flex-shrink w-full px-3 py-4 text-base text-gray-500 border border-gray-200 rounded shadow-sm shadow-gray-100 focus:outline-none"
                value={car.modelId}
                onChange={(e) => handleInputChange(e)}
              >
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
                name="color"
                value={car.color}
                onChange={handleInputChange}
                className="relative flex-1 flex-grow flex-shrink w-full px-3 py-4 text-base text-gray-500 border border-gray-200 rounded shadow-sm shadow-gray-100 focus:outline-none"
              />
      
              <label className="block text-gray-700 font-semibold mb-2">Numero de Serie</label>
              <input
                type="text"
                name="serialnumber"
                value={car.serialnumber}
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
                Guardar
              </button>
              <button
                onClick={closeModal}
                type="button"
                title="CANCELAR"
                className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md mr-2"
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
