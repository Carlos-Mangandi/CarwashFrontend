import React, { useState } from "react";
import useUserStore from "../../store/user.store";
import useRolStore from "../../store/rol.store";
import { FaRegEdit } from "react-icons/fa";

const UpdateUser = ({
    id,
    nameUser,
    emailUser,
    newRolId,
  }: {
    id: number;
    nameUser: string;
    emailUser: string;
    newRolId: number;
  }) => {
  const { roles, OnGetRoles } = useRolStore();
  const { OnUpdateUser } = useUserStore();
  const [name, setName] = useState(nameUser);
  const [email, setEmail] = useState(emailUser);
  const [rol, setRol] = useState(newRolId);
  const [newPassword, setNewPassword] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  React.useEffect(() => {
    OnGetRoles('');
  }, []);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setName(nameUser);
    setEmail(emailUser);
    setRol(newRolId);
    setNewPassword("");
  };

  const handleInputChangeE = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleInputChangeN = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRol(Number(e.target.value));
  };

  const handleSubmit = async () => {
    if (email.trim() !== "") {
      const updateUser = {
        id: id,
        name: name,
        email: email,
        rolId: rol,
        password: newPassword,
      };

      await OnUpdateUser(id, updateUser);
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
            <h3 className="text-xl font-semibold mb-4">Actualizar</h3>
            <form>
              <div>
                <label
                  htmlFor="user"
                  className="block font-normal text-start mb-2"
                >
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  id="name"
                  name="nombre"
                  value={name}
                  onChange={handleInputChangeN}
                  className="w-full h-10 p-4 border rounded-xl"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-normal text-start mb-2"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleInputChangeE}
                  className="w-full h-10 p-4 border rounded-xl"
                />
              </div>
              <div>
                <label htmlFor="rolId" className="block font-normal text-start mb-2">
                  Selecciona un Rol:
                </label>
                <select
                  id="rolId"
                  name="rolId"
                  onChange={(e) => handleSelectChange(e)}
                  value={rol}
                  className="w-full border-gray-300 rounded-lg px-3 py-2 mb-4"
                >
                  <option value="" disabled>
                    Selecciona un rol
                  </option>
                  {roles.map((rol) => (
                    <option key={rol.id} value={rol.id}>
                      {rol.type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full"
                >
                  Si
                </button>
                &nbsp;&nbsp;
                <button
                  onClick={closeModal}
                  type="button"
                  className="bg-red-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full"
                >
                  No
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
