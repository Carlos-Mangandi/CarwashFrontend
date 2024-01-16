import { useEffect, useState } from "react";
import useCarStore from "../../store/car.store";
import Layout from "../../components/Layout";
import CreateCar from "./createCar";
import UpdateCar from "./updateCar";
import { MdDelete } from "react-icons/md";
import { TiMediaPlayReverse } from "react-icons/ti";
import { TiMediaPlay } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCircle } from "react-icons/fa";
import { FontAwesomeIcon } from "../../plugins/font-awesome";

export default function TableCar() {
  const [carDelete, SetCarDelete] = useState<{
    id: number;
    colorCar: string;
  } | null>(null);
  const { OnGetCar, OnDeleteCar, cars, pagination_car} = useCarStore();
  const [displayCount, setDisplayCount] = useState(5);


  useEffect(() => {
    OnGetCar(1,displayCount,"");
  }, [OnGetCar,displayCount]);

  const handleDelete = (id: number, colorCar: string) => {
    SetCarDelete({ id, colorCar });
  };

  const confirmDelete = () => {
    if (carDelete) {
      OnDeleteCar(carDelete.id);
      SetCarDelete(null);
    }
  };

  const cancelDelete = () => {
    SetCarDelete(null);
  };
  const handleSearch = (color = "") => {
    OnGetCar(1,5,color);
  };
  const handleDisplayCountChange = (event: { target: { value: string } }) => {
    const newDisplayCount = parseInt(event.target.value, 10);
    setDisplayCount(newDisplayCount);
  };

  const handleNext = () => {
    console.log("Current Page:", pagination_car.currentPage);
    console.log("Total Pages:", pagination_car.totalPage);

    if (pagination_car.currentPage < pagination_car.totalPage) {
      OnGetCar(pagination_car.currentPage + 1, displayCount, "");
    }
  };

  const handlePrev = () => {
    console.log("Current Page:", pagination_car.currentPage);
    console.log("Total Pages:", pagination_car.totalPage);

    if (pagination_car.currentPage > 1) {
      OnGetCar(pagination_car.currentPage - 1, displayCount, "");
    }
  };

  console.log("Is Prev Button Disabled:", pagination_car.currentPage === 1);
  console.log(
    "Is Next Button Disabled:",
    pagination_car.currentPage === pagination_car.totalPage
  );

  return (
    <>
      <Layout>
        <>
          <div className=" p-10 w-full">
            <CreateCar />
            <div className="flex justify-start p-5 items-center text-gray-400 focus-within:text-gray-400">
            <div className="">
              <FontAwesomeIcon
                    icon="search"
                    className="absolute text-sm ml-36 mt-1 text-black"
                    scale="2"
                  />
                <p className="text-sm font-semibold text-gray-800 ml-2">Buscar Por Nombre</p>
               
          <input className="w-72 max-h-screen py-5 pl-12 text-sm border outline-none rounded-xl"
            type="text"
            placeholder="Buscar...."
            onChange={(e)=>{
              handleSearch(e.target.value)
            }}
            />
            </div>
              <div className="flex flex-col w-full md:w-full">
               <p className="text-sm font-semibold text-gray-800 ml-56">
                Cantidad a mostrar
              </p>
              <select
                className=" w-80 ml-56  p-5 mt-1 text-sm font-semibold border outline-none rounded-xl"
                onChange={handleDisplayCountChange}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              </div>
            </div>
            <div className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-black">
              <table className="min-w-full">
                <thead className="text-xs text-black uppercase bg-gray-50  dark:text-white">
                  <tr className="bg-[#0e0e0e] text-white">
                    <th className="py-2 px-4">Id</th>
                    <th className="py-2 px-4">Marca</th>
                    <th className="py-2 px-4">Modelo</th>
                    <th className="py-2 px-4">Color</th>
                    <th className="py-2 px-4">Numero de Serie</th>
                    <th className="py-2 px-4">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {cars &&
                    cars.map((car) => (
                      <tr className="bg-white" key={car.id}>
                        <td className="py-2 px-4  text-center">{car.id}</td>
                        <td className="py-2 px-4 font-normal text-center">
                          {car.brand.type}
                        </td>
                        <td className="py-2 px-4 font-normal text-center">
                          {car.model.typemodel}
                        </td>
                        <td className="py-2 px-4 font-normal text-center">
                          {car.color}
                        </td>
                        <td className="py-2 px-4 font-normal text-center">
                          {car.serialnumber}
                        </td>
                        <td className="px-4 py-2 flex items-center justify-around">
                          <div className="flex items-center justify-center space-x-2">
                            <UpdateCar
                              id={car.id}
                              newBrandId={car.brandId}
                              newModelId={car.modelId}
                              color={car.color}
                              serialNumber={car.serialnumber}
                            />
                            <button
                              onClick={() =>
                                handleDelete(car.id, car.brand.type)
                              }
                              className="text-red-500 border border-red-600 rounded-2xl"
                            >
                              <MdDelete size={34}></MdDelete>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* <ToastContainer /> */}
          {carDelete && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow p-6 sm:p-4 lg:p-20 w-full max-w-md">
            <RiDeleteBin6Line className="mx-auto text-red-500" size={90} />
            <h3 className="text-2xl font-black text-center mb-4 ">Eliminar Registro?</h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-4">Esta seguro de eliminar el registro esta opción no se puede revertir.</p>
              <div className="flex justify-center">
                <button
                  onClick={confirmDelete}
                  className="bg-red-700 hover:bg-red-600 text-white  py-2 px-2 rounded-2xl"
                >
                  Eliminar
                </button>
                <button
                  onClick={cancelDelete}
                  className="bg-gray-900 hover:bg-black text-white font-bold py-2 px-2 rounded-2xl ml-4"
                >
                  Cancelar
                </button>
              </div>
            </div>
            
          </div>
          )}
           <div className="pagination-controls flex items-center justify-center space-x-4">

<button
  className={` border-none p-1 ${
    pagination_car.currentPage === 1
  }`}
  
  onClick={handlePrev}
  disabled={pagination_car.currentPage === 1}
>
  <TiMediaPlayReverse className="text-black w-14 h-14" />

</button>
<div className="relative flex items-center">
<span className="w-8 h-9 absolute ml-4 mt-2 text-white"> {pagination_car.currentPage}</span>
<FaCircle className="w-10 h-14 mr-1 text-black "/>
</div>

<button
  className={` ${
    pagination_car.currentPage === pagination_car.totalPage
  }`}
  onClick={handleNext}
  disabled={pagination_car.currentPage === pagination_car.totalPage}
>
  <TiMediaPlay className="text-black w-14 h-14" />

</button>
</div>
        </>
      </Layout>
    </>
  );
}
