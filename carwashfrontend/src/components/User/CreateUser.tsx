import React, { useState } from "react";
import useUserStore from "../../store/user.store";
import { ICreateUser } from "../../types/user.types";
import useRolStore from "../../store/rol.store";
import { FaPlus } from "react-icons/fa";
import { BsSave2Fill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

const CreateUser = () => {
    const {roles, OnGetRoles} = useRolStore();    
    const {OnCreateUser} = useUserStore();
    const [isOpenModal, setOpenModal] = useState(false);

    React.useEffect(() => {
        OnGetRoles();
    }, []);

    const [user, setUser] = useState<ICreateUser>({
        email: '',
        password: '',
        rolId: 0,
    });

    const openModal = () => {
        setOpenModal(true);
    }

    const closeModal = () => {
        setOpenModal(false);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try{
            await OnCreateUser(user);
            closeModal();
        }
        catch(error){
            console.error("Error creating user: ", error);
        }
    }
    return(
        <>
        <div>
            <button onClick={openModal} className="bg-green-500 text-white font-bold py-2 px-4 rounded-full flex items-center text-center">
                <FaPlus></FaPlus>
                <span>Add</span>
            </button>
            {isOpenModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-medium mb-4 text-center">Add Rol</h3>
                        <form >
                            <div className="mb-4">
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
                                <select
                                    name="rolId"
                                    onChange={(e) => handleInputChange(e)}
                                    value={user.rolId}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
                                >
                                    <option value="" disabled>Select a rol</option>
                                    {roles.map((rol) => (
                                        <option key={rol.id} value={rol.id}>
                                            {rol.type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button onClick={handleSubmit} className="px-4 py-2 text-black bg-blue-600 text-sm font-medium rounded-md">
                                    <BsSave2Fill /> &nbsp;&nbsp;&nbsp;
                                    <span>Save</span>
                                </button>&nbsp;&nbsp;&nbsp;
                                <button onClick={closeModal} type="button" className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md ml-2">
                                    <MdCancel/> &nbsp;&nbsp;
                                    <span>Cancel</span>
                                </button>&nbsp;&nbsp;
                            </div>
                        </form>
                    </div>
                    {/* <div className="fixed inset-0 flex items-center justify-center z-50"> */}
                        {/* <div className="modal-container bg-white p-6 rounded-lg shadow-lg relative">
                            <span onClick={closeModal} className="close-modal absolute top-2 right-4 text-gray-600 cursor-pointer text-2xl">
                                &times;
                            </span>
                            <h2 className="text-xl font-semibold mb-4">Add Rol</h2>
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

                            <select
                                name="rolId"
                                onChange={(e) => handleInputChange(e)}
                                value={user.rolId}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
                            >
                                <option value="" disabled>Select a rol</option>
                                {roles.map((rol) => (
                                    <option key={rol.id} value={rol.id}>
                                        {rol.type}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={handleSubmit}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                            >
                                Create
                            </button>
                        </div> */}
                </div>
            )}
        </div>
        </>
    )
}

export default CreateUser