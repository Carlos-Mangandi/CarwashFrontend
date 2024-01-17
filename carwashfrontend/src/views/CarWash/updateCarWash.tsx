import React, { useState } from "react";
import useCarWashStore from "../../store/carwash.store";
import useClientStore from "../../store/client.store";
import { FaMarker } from "react-icons/fa6";

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
    OnGetClient(1,5,"");
  }, [OnGetClient]);

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
        className="flex justify-center py-2 px-2 text-green-500 border border-green-500 rounded-3xl"
      >
        <FaMarker size={26}></FaMarker>
      </button>

      {isOpenModal && (
        <div className="fixed inset-0 flex items-center justify-end z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-8 w-96">
          <div className="flex justify-end">
            <span className="cursor-pointer" onClick={closeModal}>
              &#x2715;
            </span>
          </div>
          <h3 className="text-xl font-semibold mb-6 text-center">Actualizar CarWash</h3>
          <form>
            <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Tipo de Servicio.</label>
              <input
                type="text"
                id="type"
                name="type"
                value={type}
                onChange={handleInputChange}
                className="relative flex-1 flex-grow flex-shrink w-full px-3 py-4 text-base text-gray-500 border border-gray-200 rounded shadow-sm shadow-gray-100 focus:outline-none"
              />  
               <label className="block text-gray-700 font-semibold mb-2">Precio</label>
              <input
                type="number"
                name="price"
                id="price"
                value={price===0?"":price}
                onChange={handleInputChangePrice}
                className="relative flex-1 flex-grow flex-shrink w-full px-3 py-4 text-base text-gray-500 border border-gray-200 rounded shadow-sm shadow-gray-100 focus:outline-none"
              />
               <label className="block text-gray-700 font-semibold mb-2">Cantidad</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={amount===0?"":amount}
                onChange={handleInputChangeAmount}
                className="relative flex-1 flex-grow flex-shrink w-full px-3 py-4 text-base text-gray-500 border border-gray-200 rounded shadow-sm shadow-gray-100 focus:outline-none"
              />
              <label className="block text-gray-700 font-semibold mb-2">Seleccione un Cliente</label>
              <select
                name="clientId"
                className="relative flex-1 flex-grow flex-shrink w-full px-3 py-4 text-base text-gray-500 border border-gray-200 rounded shadow-sm shadow-gray-100 focus:outline-none"
                value={clients}
                onChange={handleSelectChange}              >
                <option value="" disabled>Todos los Clientes</option>
                {client&& client.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                title="GUARDAR"
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-500 text-white font-medium rounded-md mr-2"
              >
                Actualizar
              </button>
              <button
                onClick={closeModal}
                type="button"
                title="CANCELAR"
                className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md"
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
