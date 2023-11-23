


import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ICreateRol } from '../../types/rol.types';
import { create_rol } from '../../services/rol.service';

export default function CreateRol(){
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false)
  const {  handleSubmit, register, reset } = useForm<ICreateRol>();

  const handleSaveRole = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000); 
  };

  const onSubmit = (data: ICreateRol) => {
    console.log(data)
    create_rol(data)
    .then((data) => {
      console.log('Role successfully added:', data);

      closeModal();
      reset()
    })
  }
  
  const closeModal = () => {
    setShowModal(false)
  };
         
  const openModal = () => {
      setShowModal(true);
  };

  return (
    <div className="bg-white p-2 flex justify-center opacity-100">
      <button onClick={openModal}  className="flex items-center text-black font-semibold py-2 px-4 rounded-md shadow-md">
        <span>Add </span>
      </button>

      <div>
      {showAlert && (
        <div className="px-4 py-6 bg-white rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200">
          <div>Success alert</div>
          <button onClick={() => setShowAlert(false)}>
            <svg className="fill-current text-gray-700" viewBox="0 0 16 16" width="20" height="20">
              <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
            </svg>
          </button>
        </div>
      )}
      </div>

      {showModal &&(
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium mb-4 text-center">Add Rol</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="rol" className="block text-gray-700 text-sm font-medium">Rol:</label>
                <input  {...register("type")} className="w-full h-10 p-4 border rounded-xl" placeholder="Entry rol"/> 
              </div>
              <div className="flex justify-end">
                <button onClick={handleSaveRole} type="submit" className="px-4 py-2 text-black bg-blue-600 text-sm font-medium rounded-md">
                  Save
                </button>
                <button onClick={closeModal} type="button" className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md ml-2">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
    