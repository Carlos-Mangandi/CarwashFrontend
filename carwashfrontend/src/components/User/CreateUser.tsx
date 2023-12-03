import React, { useState } from "react";
import useUserStore from "../../store/user.store";
import { ICreateUser } from "../../types/user.types";
import useRolStore from "../../store/rol.store";
import { FaPlus } from "react-icons/fa";
import { BsSave2Fill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

const CreateUser = () => {
  const { roles, OnGetRoles } = useRolStore();
  const { OnCreateUser } = useUserStore();
  const [isOpenModal, setOpenModal] = useState(false);

  React.useEffect(() => {
    OnGetRoles();
  }, []);

  const [user, setUser] = useState<ICreateUser>({
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
      alert("error");
      return;
    }

    try {
      await OnCreateUser(user);
      closeModal();
    } catch (error) {
      console.error("Error creating user: ", error);
    }
  };

  return (
    <>
      <div className="flex justify-end opacity-100">
        <button onClick={openModal} className="flex justify-items-end m-5  py-4 px-4   rounded-full bg-green-500 text-white">
          <FaPlus></FaPlus>
        </button>
        {isOpenModal && (
          <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
            <div className="bg-white w-full h-full fixed top-0 left-0 flex items-center justify-center">
              <div className="bg-white w-96 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-medium mb-4 text-center">Add User</h3>
                <form>
                  <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={user.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
                  />
                  <input
                    type="text"
                    name="email"
                    placeholder="email"
                    value={user.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
                  />
                  <p className="justify-center">Select rol</p>
                  <select name="rolId"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
                    value={user.rolId}
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option value="" >
                      Todos los roles
                    </option>
                    {roles.map((rol) => (
                      <option key={rol.id} value={rol.id}>
                        {rol.type}
                      </option>
                    ))}
                  </select>
                </div>
                  <div className="flex justify-center">
                    <button onClick={handleSubmit} className="px- py-2 text-blue-600">
                      <BsSave2Fill size={40} />
                    </button>
                    <button onClick={closeModal} type="button" className="px-4 py-2 text-red-800">
                      <MdCancel size={50} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateUser;