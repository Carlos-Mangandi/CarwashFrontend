import React, { useState } from "react";
import { useRolesStore } from "../../store/rol.store";
import { FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateRol = () => {
  const { OnCreateRol } = useRolesStore();
  const [rol, setRol] = useState({
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
    setRol({ ...rol, [name]: value });
  };

  const handleSubmit = async () => {
    if (!rol.type) {
      toast.error("El campo es requerido");
      return;
    }

    try {
      await OnCreateRol(rol);
      closeModal();
      toast.success("Rol creado exitosamente");
    } catch (error) {
      console.log("Error al crear el rol", error);
      toast.error("Error al crear el rol");
    }
  };

  return (
    <>
      <div className="bg-white p-2 opacity-100">
        <button
          title="AGREGAR"
          onClick={openModal}
          className="flex justify-center m-5  py-4 px-4 rounded-full bg-green-500 text-white"
        >
          <FaPlus></FaPlus>
        </button>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <form>
                <div className="mb-3">
                  <label
                    htmlFor="type"
                    className="text-black font-normal text-start"
                  >
                    Nombre del rol
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={rol.type}
                    onChange={handleInputChange}
                    className="w-full font-normal border border-black rounded-lg px-3 py-2 mb-4"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 py-2 text-white bg-blue-600 text-sm font-medium rounded-md"
                  >
                    GUARDAR
                  </button>
                  <button
                    onClick={closeModal}
                    type="button"
                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md ml-2"
                  >
                    CANCELAR
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

export default CreateRol;
