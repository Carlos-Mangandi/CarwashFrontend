import React, { useState } from "react";
import useCarWashStore from "../../store/carwash.store";
import useClientStore from "../../store/client.store";
import { FaRegEdit } from "react-icons/fa";

const UpdateCarWash = ({
  id,
  newClientId,
  serviceType,
  priceService,
  amountService,
}: {
  id: number;
  newClientId: number;
  serviceType: string;
  priceService: number;
  amountService: number;
}) => {
  const { client, OnGetClient } = useClientStore();
  const { OnUpdateCarWash } = useCarWashStore();
  const [clients, setClients] = useState(newClientId);
  const [type, setType] = useState(serviceType);
  const [price, setPrice] = useState(priceService);
  const [amount, setAmount] = useState(amountService);
  const [isOpenModal, setIsOpenModal] = useState(false);

  React.useEffect(() => {
    OnGetClient("");
  }, []);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setClients(newClientId);
    setType(type);
    setPrice(price);
    setAmount(amount);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const handleInputChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };
  const handleInputChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setClients(Number(e.target.value));
  };

  const handleSubmit = async () => {
    if (type.trim() !== "") {
      const updatecarwash = {
        id: id,
        type: type,
        price: price,
        amount: amount,
        clientId: clients,
      };

      await OnUpdateCarWash(id, updatecarwash);
      closeModal();
    }
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="flex justify-center py-2 px-2 text-green-500"
      >
        <FaRegEdit size={26}></FaRegEdit>
      </button>

      {isOpenModal && (
        <div className="fixed inset-0 flex items-center justify-end z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 h-full w-96 absolute right-0">
            <span onClick={closeModal}></span>
            <h3 className="text-xl font-semibold mb-4">
              Actualizar Servicio
            </h3>
            <form>
              <div className="mb-4">
                <label 
                  htmlFor="clientId" 
                  className="text-start block font-normal mb-2"
                >
                  Cliente
                </label>
                <select
                  id="clientId"
                  name="clientId"
                  onChange={handleSelectChange}
                  value={clients}
                  className="w-full border border-black rounded-lg px-3 py-2 mb-4 bg-white"
                >
                  <option value="" disabled>
                    Seleccione un Cliente
                  </option>
                  {client.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>

                <label 
                  htmlFor="type" 
                  className="text-start block font-normal mb-2"
                >
                  Servicio
                </label>
                <input
                  type="text"
                  name="type"
                  value={type}
                  onChange={handleInputChange}
                  className="w-full border border-black rounded-lg px-3 py-2 mb-4 bg-white"
                />

                <label 
                  htmlFor="price" 
                  className="text-start block font-normal mb-2"
                >
                  Precio
                </label>
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={handleInputChangePrice}
                  className="w-full border border-black rounded-lg px-3 py-2 mb-4 bg-white"
                />

                <label 
                  htmlFor="amount" 
                  className="text-start block font-normal mb-2"
                >
                  Cantidad
                </label>
                <input
                  type="number"
                  name="amount"
                  value={amount}
                  onChange={handleInputChangeAmount}
                  className="w-full border border-black rounded-lg px-3 py-2 mb-4 bg-white"
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
                  className="px-4 py-2 bg-red-600 text-black text-sm font-medium rounded-md ml-2"
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
export default UpdateCarWash;
