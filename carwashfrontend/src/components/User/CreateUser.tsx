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
    try {
      await OnCreateUser(user);
      closeModal();
    } catch (error) {
      console.error("Error creating user: ", error);
    }
  };

  return (
    <>
      <div className=" flex justify-end opacity-100">
      <button onClick={openModal}  className="flex justify-items-end m-5  py-4 px-4   rounded-full bg-green-500 text-white">
        <FaPlus></FaPlus>
      </button>
        {isOpenModal && (
          <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
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
                  {/* <select
                    name="rolId"
                    onChange={(e) => handleInputChange(e)}
                    value={user.rolId}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
                  >
                    <option value="" >
                      Select a rol
                    </option>
                    {roles.map((rol) => (
                      <option key={rol.id} value={rol.id}>
                        {rol.type}
                      </option>
                    ))}
                  </select> */}
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
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 text-black bg-blue-600 text-sm font-medium rounded-md"
                  >
                    <BsSave2Fill /> &nbsp;&nbsp;&nbsp;
                    <span>Save</span>
                  </button>
                  &nbsp;&nbsp;&nbsp;
                  <button
                    onClick={closeModal}
                    type="button"
                    className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md ml-2"
                  >
                    <MdCancel /> &nbsp;&nbsp;
                    <span>Cancel</span>
                  </button>
                  &nbsp;&nbsp;
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateUser;
