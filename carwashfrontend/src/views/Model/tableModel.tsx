import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import useModelStore from "../../store/model.store";
import CreateModel from "./createModel";
import UpdateModel from "./updateModel";
import { FontAwesomeIcon } from "../../plugins/font-awesome";
import { MdDelete } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaHandPointLeft, FaHandPointRight } from "react-icons/fa";

function TableModel() {
  const { models, OnGetModels, OnDeleteModel, pagination_model } =
    useModelStore();
  const [modelDelete, setModelDelete] = useState<{
    id: number;
    modelName: string;
  } | null>(null);
  const [displayCount, setDisplayCount] = useState(5);

  useEffect(() => {
    OnGetModels(1, displayCount, "");
  }, [OnGetModels, displayCount]);

  const handleDelete = (id: number, modelName: string) => {
    setModelDelete({ id, modelName });
  };

  const confirmDelete = () => {
    if (modelDelete) {
      OnDeleteModel(modelDelete.id);
      setModelDelete(null);
    }
  };

  const cancelDelete = () => {
    setModelDelete(null);
  };

  const handleSearch = (typemodel = "") => {
    OnGetModels(1, 5, typemodel);
  };
  const handleDisplayCountChange = (event: { target: { value: string } }) => {
    const newDisplayCount = parseInt(event.target.value, 10);
    setDisplayCount(newDisplayCount);
  };

  const handleNext = () => {
    console.log("Current Page:", pagination_model.currentPage);
    console.log("Total Pages:", pagination_model.totalPage);

    if (pagination_model.currentPage < pagination_model.totalPage) {
      OnGetModels(pagination_model.currentPage + 1, displayCount, "");
    }
  };

  const handlePrev = () => {
    console.log("Current Page:", pagination_model.currentPage);
    console.log("Total Pages:", pagination_model.totalPage);

    if (pagination_model.currentPage > 1) {
      OnGetModels(pagination_model.currentPage - 1, displayCount, "");
    }
  };

  console.log("Is Prev Button Disabled:", pagination_model.currentPage === 1);
  console.log(
    "Is Next Button Disabled:",
    pagination_model.currentPage === pagination_model.totalPage
  );

  return (
    <>
      <Layout>
        <>
          <div className="p-10 w-full">
            <CreateModel></CreateModel>
            <div className="flex justify-start p-5 items-center text-gray-400 focus-within:text-gray-400">
              <div className="">
                <FontAwesomeIcon
                  icon="search"
                  className="absolute text-sm ml-36 mt-1 text-black"
                  scale="2"
                />
                <p className="text-sm font-semibold text-gray-800">
                  Buscar Por Nombre
                </p>

                <input
                  className="w-72 py-5 pl-12 text-sm border outline-none rounded-xl"
                  type="text"
                  placeholder="Buscar...."
                  onChange={(e) => {
                    handleSearch(e.target.value);
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
            <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-black table-auto">
              <thead className="hover:table-fixed text-xs text-black uppercase bg-[#0e0e0e] dark:text-white">
                <tr>
                  <th scope="col" className="px-6 py-3 ">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Marca
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {models &&
                  models.map((model) => (
                    <tr key={model.id}>
                      <td className="py-2 px-4 text-center font-normal">
                        {model.id}
                      </td>
                      <td className="py-2 px-4 text-center font-normal">
                        {model.typemodel}
                      </td>
                      <td className="flex items-center justify-center space-x-5">
                        <UpdateModel
                          modelId={model.id}
                          modelNameUpdate={model.typemodel}
                        ></UpdateModel>
                        <button
                          onClick={() =>
                            handleDelete(model.id, model.typemodel)
                          }
                          className="text-red-500 border border-red-600 rounded-3xl"
                        >
                          <MdDelete size={35}></MdDelete>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {modelDelete && (
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
          <ul className="m justify-center w-full flex ">
            <li>
              <button
                className={` border-none p-1 ${
                  pagination_model.currentPage === 1
                }`}
                onClick={handlePrev}
                disabled={pagination_model.currentPage === 1}
              >
                <FaHandPointLeft className=" text-2xl text-white bg-black rounded-full p-2 w-10 h-10" />
              </button>
            </li>

            <li className="relative flex items-center">
              <button
                className={` mx-1 border font-extrabold border-black rounded-3xl
     p-2 w-12 h-12 text-center text-white bg-black text-sm flex `}
              >
                <span className="text-center w-20 h-20 mt-1 ">
                  {pagination_model.currentPage}
                </span>
              </button>
            </li>

            <li>
              <button
                className={`border-none p-1 ${
                  pagination_model.currentPage === pagination_model.totalPage
                }`}
                onClick={handleNext}
                disabled={
                  pagination_model.currentPage === pagination_model.totalPage
                }
              >
                <FaHandPointRight className=" text-3xl text-white bg-black rounded-full p-2 w-10 h-10" />
              </button>
            </li>
          </ul>
        </>
      </Layout>
    </>
  );
}
export default TableModel;
