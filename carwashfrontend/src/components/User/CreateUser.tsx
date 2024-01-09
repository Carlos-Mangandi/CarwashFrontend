import React, { useState } from "react";
import useUserStore from "../../store/user.store";
import useRolStore from "../../store/rol.store";
import { FaPlus } from "react-icons/fa";
import { BsSave2Fill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateUser = () => {
  const { roles, OnGetRoles } = useRolStore();
  const { OnCreateUser } = useUserStore();
  const [isOpenModal, setOpenModal] = useState(false);

  React.useEffect(() => {
    OnGetRoles("");
  }, []);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    rolId: 0,
  });

  const openModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (!user.name || !user.email || !user.password || user.rolId === 0) {
      toast.error("Todos los campos son requeridos");
      return;
    }

    try {
      await OnCreateUser(user);
      closeModal();
      toast.success("Usuario creado exitosamente");
    } catch (error) {
      console.error("Error creating user: ", error);
      toast.error("Error al crear usuario");
    }
  };

  return (
    <>
      <div>
        <button
          onClick={openModal}
          title="AGREGAR"
          className="flex justify-items-end m-5 py-4 px-4 rounded-full bg-green-500 text-white"
        >
          <FaPlus></FaPlus>
        </button>
        {isOpenModal && (
          <div className="fixed inset-0 flex items-center justify-end z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 h-full w-96 absolute right-0">
              <span onClick={closeModal}></span>
              <h3 className="text-xl text-center font-semibold mb-8">
                Nuevo Usuario
              </h3>
              <form>
                <div className="mb-3">
                  <label
                    htmlFor="user"
                    className="text-black font-normal text-start"
                  >
                    Nombre de Usuario
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    className="w-full font-normal border border-black rounded-lg px-3 py-2 mb-4"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-normal mb-2">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    placeholder="ejemplo@gmail.com"
                    className="w-full font-normal border border-black rounded-lg px-3 py-2 mb-4"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block font-normal mb-2">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInputChange}
                    placeholder="***********"
                    className="w-full border font-normal border-black rounded-lg px-3 py-2 mb-4"
                  />
                </div>
                <div>
                  <label
                    htmlFor="rolId"
                    className="block font-normal text-start mb-2"
                  >
                    Seleccionar Rol
                  </label>
                  <select
                    name="rolId"
                    className="w-full border border-black rounded-lg px-3 py-2 mb-4"
                    value={user.rolId}
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option value="">Todos los roles</option>
                    {roles.map((rol) => (
                      <option key={rol.id} value={rol.id}>
                        {rol.type}
                      </option>
                    ))}
                  </select>{" "}
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleSubmit}
                    type="button"
                    title="GUARDAR"
                    className="px-4 py-2 text-white bg-blue-600 rounded-full mr-4"
                  >
                    <BsSave2Fill size={40} />
                  </button>
                  <button
                    onClick={closeModal}
                    type="button"
                    title="CANCELAR"
                    className="px-4 py-2 text-white bg-red-600 rounded-full mr-4"
                  >
                    <MdCancel size={50} />
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

export default CreateUser;
