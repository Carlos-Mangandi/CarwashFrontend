import React, { useState } from 'react';
import {useRolesStore} from '../../store/rol.store';
import { FaPlus } from 'react-icons/fa';
import { ImCancelCircle } from "react-icons/im";
import { IoSave } from "react-icons/io5";

export default function CreateRol(){
  const {OnCreateRol} = useRolesStore();
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
      </button>

      {showModal &&(
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <form >
              <div className="mb-4">
                <input  type="text" value={roleName} onChange={handleInputChange} className="w-full h-10 p-4 border rounded-xl" placeholder="Ingrese un rol"/> 
              </div>
              <div className="flex justify-center">
                <button onClick={handleSubmit} className="text-blue-500">
                <IoSave size={30}/> 
                </button> 
                <button onClick={closeModal} type="button" className="text-red-500">
                  <ImCancelCircle size={30}/> 
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
 