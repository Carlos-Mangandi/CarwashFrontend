import React, { useState } from "react";
import useBrandStore from "../../store/brand.store";
import { FaMarker } from "react-icons/fa6";

const UpdateBrand = ({
  id,
  brandName,
}: {
  id: number,
  brandName: string
}) => {
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState(brandName);
  const { OnUpdateBrand } = useBrandStore();

  const closeModal = () => {
    setShowModal(false);
    setType(brandName);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const handleSubmit = async () => {
    if (brandName.trim() !== "") {
      await OnUpdateBrand({ id: id, type: brandName, state: true});
      closeModal();
    }
  };
  return (
    <div>
      <button
        onClick={openModal}
        className="flex justify-center py-2 px-2 text-green-600 bg-white border border-green-500 rounded-3xl"
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
                  value={type}
                  onChange={handleInputChange}
                  className="relative flex-1 flex-grow flex-shrink w-full px-3 py-4 text-base text-gray-500 border border-gray-200 rounded shadow-sm shadow-gray-100 focus:outline-none"
                />
              </div>
              <div className="flex justify-center">
                <button
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
  );
};
export default UpdateBrand;
