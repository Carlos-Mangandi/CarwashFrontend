import { useEffect, useState } from "react";
  import Layout from "../../components/Layout";
  import useModelStore from "../../store/model.store";
  import CreateModel from "./createModel";
  import UpdateModel from "./updateModel";
  import { MdDelete } from "react-icons/md";

  function TableModel() {
    const { models, OnGetModels, OnDeleteModel } = useModelStore();
    const [modelDelete, setModelDelete] = useState<{
      id: number;
      modelName: string;
    } | null>(null);

    useEffect(() => {
      OnGetModels("");
    }, []);

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
      OnGetModels(typemodel);
    };

    return (
      <>
        <Layout>
          <>
            <div className="p-10 w-full">
              <CreateModel></CreateModel>
              <div className="flex justify-start p-5 items-center text-gray-400 focus-within:text-gray-400">
                <input
                  className="pr-3 pl-10 py-2 font-normal placeholder-gray-400  rounded-2xl border-none ring-2 ring-gray-400 focus:ring-gray-600 focus:ring-2 "
                  type="text"
                  placeholder="Buscar...."
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                />
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
                <tbody>
                  {models && 
                  
                  models.map((model) => (
                    <tr key={model.id}>
                      <td className="py-2 px-4 text-center font-normal">
                        {model.id}
                        </td>
                      <td className="py-2 px-4 text-center font-normal">
                        {model.typemodel}
                      </td>
                      <td className="px-4 py-2 flex items-center justify-around">
                        <UpdateModel
                          modelId={model.id}
                          modelNameUpdate={model.typemodel}
                        ></UpdateModel>
                        <button
                          onClick={() =>
                            handleDelete(model.id, model.typemodel)
                          }
                          className="text-red-500 border border-red-600 rounded-2xl"
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
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <p>
                    ¿Esta seguro que desea eliminar el modelo "
                    {modelDelete.modelName}"?
                  </p>
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={confirmDelete}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={cancelDelete}
                      className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full ml-4"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        </Layout>
      </>
    );
  }
  export default TableModel;
