import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import useBrandStore from "../../store/brand.store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateBrand = () => {
  const { OnCreateBrand } = useBrandStore();
  const [brandName, setBrandName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    setBrandName("");
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrandName(e.target.value);
  };

  const handleSubmit = async () => {
    if (!brandName.trim()) {
      toast.error("Nombre de marca requerido");
      return;
    }

    try {
      await OnCreateBrand(brandName);
      closeModal();
      toast.success("Marca creada exitosamente");
    } catch (error) {
      console.log("Error al crear marca: ", error);
      toast.error("Error al crear marca");
    }
  };

  return (
    <>
      <div>
        <button
          onClick={openModal}
          className="flex justify-center m-5 py-4 px-4 rounded-full bg-green-500 text-white"
        >
          <FaPlus />
        </button>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <span onClick={closeModal}></span>
              <h3 className="text-lg font-semibold mb-4 text-center">Marca</h3>

              <form>
                <div className="mb-4">
                  <label
                    htmlFor="brand"
                    className="block text-start font-normal"
                  >
                    Nombre:
                  </label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={handleInputChange}
                    className="font-normal w-full h-10 p-4 border rounded-xl bg-white border-black"
                  />
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 py-2 text-white bg-blue-600 rounded-full mr-4"
                  >
                    <span>Guardar</span>
                  </button>
                  <button
                    onClick={closeModal}
                    type="button"
                    className="px-4 py-2 bg-red-600 text-white rounded-full"
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
