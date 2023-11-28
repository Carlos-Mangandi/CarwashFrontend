import React, { useState } from 'react';
import useRoleStore from '../../store/rol.store';
import { FaPlus } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { BsSave2Fill } from "react-icons/bs";

export default function CreateRol(){
  const {OnCreateRol} = useRoleStore();
  const[roleName, setRoleName] = useState('');
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false)
  }
         
  const openModal = () => {
      setShowModal(true);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setRoleName(e.target.value)
  }

  const handleSubmit = async () => {
    if(roleName.trim() !== ''){
      await OnCreateRol(roleName);
      closeModal()
    }
  }

  return (
    <div className="bg-white p-2  opacity-100">
      <button onClick={openModal}  className="flex justify-center m-5  py-4 px-4   rounded-full bg-green-500 text-white">
        <FaPlus></FaPlus>
        <span>Add Rol</span>
      </button>

      {showModal &&(
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium mb-4 text-center">Add Rol</h3>
            <form >
              <div className="mb-4">
                <label htmlFor="rol" className="block text-gray-700 text-sm font-medium">Rol:</label>
                <input  type="text" value={roleName} onChange={handleInputChange} className="w-full h-10 p-4 border rounded-xl" placeholder="Enter the role"/> 
              </div>
              <div className="flex justify-center">
                <button onClick={handleSubmit} className="px-4 py-2 text-black bg-blue-600 text-sm font-medium rounded-md">
                  <BsSave2Fill /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>Save</span>
                </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={closeModal} type="button" className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md ml-2">
                  <MdCancel/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>Cancel</span>
                </button>&nbsp;&nbsp;&nbsp;
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
 