import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ICreateRol } from '../../types/rol.types';
import { create_rol } from '../../services/rol.service';
import Swal from 'sweetalert2';

import { RiAddCircleFill } from 'react-icons/ri';
import { BsSave } from "react-icons/bs";
import { MdCancel } from 'react-icons/md';

export default function CreateRol() {
  const [showModal, setShowModal] = useState(false);
  const { handleSubmit, register, reset } = useForm<ICreateRol>();

  const onSubmit = (data: ICreateRol) => {
    if(!data.type){
      Swal.fire({
        icon: "error",
        title: "Required name",
        text: "Please, enter a name",
      });
      return;
    }

    create_rol(data)
    .then((data)=>{
      console.log('role added', data);
      closeModal();
      reset();
    })

    window.location.reload();
  };
  
  

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <div className="bg-white p-2 flex justify-center opacity-100">
      <button onClick={openModal} className="flex items-center text-black font-semibold py-2 px-4 rounded-md shadow-md">
        <RiAddCircleFill /> &nbsp; &nbsp;
        <span>Add </span>
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium mb-4 text-center"><b>Add Rol</b> </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="rol" className="block text-gray-700 text-sm font-medium">Rol:</label>
                <input {...register("type")} className="w-full h-10 p-4 border rounded-xl" placeholder="Entry rol" />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="flex items-center text-black bg-blue-500 font-semibold py-2 px-4 rounded-md shadow-md">
                  <BsSave /> &nbsp; &nbsp; &nbsp;
                  <span>Save</span>
                </button>&nbsp;&nbsp;&nbsp;
                <button onClick={closeModal} type="button" className="flex items-center text-black bg-red-300 font-semibold py-2 px-4 rounded-md shadow-md">
                  <MdCancel /> &nbsp;&nbsp;
                  <span>Cancel</span>
                </button>&nbsp;&nbsp;
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
