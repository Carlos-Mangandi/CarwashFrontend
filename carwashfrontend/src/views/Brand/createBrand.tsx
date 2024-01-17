import React, { useState } from "react";
import { useBrandStore } from "../../store/brand.store";
import { FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateBrand = () => {
  const { OnCreateBrand } = useBrandStore();
  const [brand, setBrand] = useState({
    type: "",
  });
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBrand({ ...brand, [name]: value });
  };

  const handleSubmit = async () => {
    if (!brand.type) {
      toast.error("El campo es requerido");
      return;
    }

    try {
      await OnCreateBrand(brand);
      closeModal();
      toast.success("Marca creado exitosamente");
    } catch (error) {
      console.log("Error al crear el marca", error);
      toast.error("Error al crear el marca");
    }
  };

  return (
    <>
      <div className=" p-2  opacity-100">
        <button
          onClick={openModal}
          className="flex justify-center m-3  py-4 px-4   rounded-full bg-green-500 text-white"
        >
          <FaPlus></FaPlus>
        </button>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-medium mb-4 text-center">
                Nuevo Marca
              </h3>
              <form>
                <div className="mb-4">
                  <input
                    type="text"
                    value={brand.type}
                    onChange={handleInputChange}
                    className="relative flex-1 flex-grow flex-shrink w-full px-3 py-4 text-base text-gray-500 border border-gray-200 rounded shadow-sm shadow-gray-100 focus:outline-none"
                    placeholder="Ingrese una Marca"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-green-500 text-white font-medium rounded-md mr-2"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={closeModal}
                    type="button"
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

export default CreateBrand;
