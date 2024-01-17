import React, { useState } from "react";
import useModelStore from "../../store/model.store";
import { FaMarker } from "react-icons/fa6";

const UpdateModel = ({
  modelId,
  modelNameUpdate,
}: {
  modelId: number;
  modelNameUpdate: string;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newModelName, setNewModelName] = useState(modelNameUpdate);
  const { OnUpdateModel } = useModelStore();

  const closeModal = () => {
    setShowModal(false);
    setNewModelName(modelNameUpdate);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewModelName(e.target.value);
  };

  const handleSubmit = async () => {
    if (newModelName.trim() !== "") {
      await OnUpdateModel({
        id: modelId,
        typemodel: newModelName,
        state: true,
      });
      closeModal();
    }
  };
  return (
    <div>
      <button
        onClick={openModal}
        className="flex justify-center py-2 px-2 text-green-600 border border-green-500 rounded-3xl"
      >
        <FaMarker size={22}></FaMarker>
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <span onClick={closeModal}></span>
            <h3 className="text-lg font-medium mb-4 text-center">
              Editar Modelo
            </h3>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 text-sm font-medium"
                ></label>
                <input
                  type="text"
                  value={newModelName}
                  onChange={handleInputChange}
                  className="relative flex-1 flex-grow flex-shrink w-full px-3 py-4 text-base text-gray-500 border border-gray-200 rounded shadow-sm shadow-gray-100 focus:outline-none"
                  placeholder="Ingrese el rol"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-500 text-white font-medium rounded-md mr-2"
                >
                  Guardar
                </button>
                <button
                  onClick={closeModal}
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md mr-8"
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
export default UpdateModel;
