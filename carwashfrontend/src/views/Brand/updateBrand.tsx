import React, { useState } from "react";
import useBrandStore from "../../store/brand.store";
import { FaMarker } from "react-icons/fa6";

const UpdateBrand = ({
  brandId,
  brandNameUpdate,
}: {
  brandId: number;
  brandNameUpdate: string;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newBrandName, setNewBrandName] = useState(brandNameUpdate);
  const { OnUpdateBrand } = useBrandStore();

  const closeModal = () => {
    setShowModal(false);
    setNewBrandName(brandNameUpdate);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBrandName(e.target.value);
  };

  const handleSubmit = async () => {
    if (newBrandName.trim() !== "") {
      await OnUpdateBrand({ id: brandId, type: newBrandName, state: true });
      closeModal();
    }
  };
  return (
    <div>
      <button
        onClick={openModal}
        className="flex justify-center py-2 px-2 text-green-600 bg-white border border-green-500 rounded-2xl"
      >
        <FaMarker size={22}></FaMarker>
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <span onClick={closeModal}></span>
            <h3 className="text-lg font-medium mb-4 text-center">
              Actualizar Marca
            </h3>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-black text-start font-normal "
                >
                  Nombre:
                </label>
                <input
                  type="text"
                  value={newBrandName}
                  onChange={handleInputChange}
                  className="font-normal w-full h-10 p-4 border border-black rounded-xl bg-white"
                />
              </div>
              <div className="flex justify-center">
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
export default UpdateBrand;
