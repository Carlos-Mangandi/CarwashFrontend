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
                  className="w-full h-10 p-4 border border-black bg-white rounded-xl"
                  placeholder="Ingrese el rol"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 text-black bg-blue-600 text-sm font-medium rounded-md"
                >
                  Guardar
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
export default UpdateModel;
