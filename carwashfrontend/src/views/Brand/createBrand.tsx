import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import useBrandStore from "../../store/brand.store";
import { BsSave2Fill } from "react-icons/bs";

export default function CreateBrand() {
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
    if (brandName.trim() !== "") {
      await OnCreateBrand(brandName);
      closeModal();
    }
  };

  return (
    <div className=" p-2  opacity-100">
      <button
        onClick={openModal}
        className="flex justify-center m-5  py-4 px-4   rounded-full bg-blue-500 text-white"
      >
        <FaPlus></FaPlus>
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium mb-4 text-center">
              Agregar Marca
            </h3>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="brand"
                  className="block text-black text-sm font-medium"
                >
                  Marca:
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={handleInputChange}
                  className="w-full h-10 p-4 border rounded-xl bg-white border-black"
                  placeholder="Ingrese Marca"
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 text-black bg-blue-600 text-sm font-medium rounded-md"
                >
                  <BsSave2Fill /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>Guardar</span>
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  onClick={closeModal}
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md ml-2"
                >
                  <MdCancel /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>Cancelar</span>
                </button>
                &nbsp;&nbsp;&nbsp;
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
