import React,{useState} from 'react'
import useUserStore from '../../store/user.store'
import useRolStore from '../../store/rol.store'
import { FaRegEdit } from "react-icons/fa";


const UpdateUser = ({ id, nameUser, emailUser, newRolId}: {id: number, nameUser:string, emailUser:string, newRolId: number}) => {
    const {roles, OnGetRoles} = useRolStore();
    const {OnUpdateUser} = useUserStore();
    const [name, setName] = useState(nameUser);
    const [email, setEmail] = useState(emailUser);
    const [rol, setRol] = useState(newRolId);
    const [newPassword, setNewPassword] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(false);

    React.useEffect(() => {
        OnGetRoles();
    }, []);

    const openModal = () => {
        setIsOpenModal(true);
    }

    const closeModal = () => {
        setIsOpenModal(false);
        setName(nameUser)
        setEmail(emailUser);
        setRol(newRolId);
        setNewPassword('');
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRol(Number(e.target.value));
    };

    const handleSubmit = async () => {
        if (email.trim() !== '') {
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
            <button onClick={openModal}  className="flex justify-center py-2 px-2 text-green-500">
                <FaRegEdit size={26}></FaRegEdit>
            </button>  
            
            {isOpenModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96"> 
                        <span onClick={closeModal}></span>
                        <h3 className="text-xl font-semibold mb-4">Edit User</h3>
                        <form className="space-y-4"> 
                            <div>
                            <input
                                type="text"
                                id="name"
                                name="nombre"
                                placeholder="enter name"
                                value={name}
                                onChange={handleInputChange}
                                className="w-full h-10 p-4 border rounded-xl"
                            />
                            </div>
                            <div>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="email"
                                value={email}
                                onChange={handleInputChange}
                                className="w-full h-10 p-4 border rounded-xl"
                            />
                            </div>
                            <div>
                            <label htmlFor="rolId" className="block font-semibold mb-2">Select a Rol:</label>
                            <select
                                id="rolId"
                                name="rolId"
                                onChange={(e) => handleSelectChange(e)}
                                value={rol}
                                className="w-full border-gray-300 rounded-lg px-3 py-2 mb-4"
                            >
                                <option value="" disabled>
                                Select a rol
                                </option>
                                {roles.map((rol) => (
                                <option key={rol.id} value={rol.id}>
                                    {rol.type}
                                </option>
                                ))}
                            </select>
                            </div>
                            <div className="flex justify-end">
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 text-black bg-blue-600 text-sm font-medium rounded-md"
                            >
                                Save
                            </button>
                            <button
                                onClick={closeModal}
                                type="button"
                                className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md ml-2"
                            >
                                Cancel
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UpdateUser