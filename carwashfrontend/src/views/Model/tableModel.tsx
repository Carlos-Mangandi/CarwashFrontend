import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import useModelStore from "../../store/model.store";
import CreateModel from "./createModel";
import UpdateModel from "./updateModel";
import { FaTrash } from "react-icons/fa";

function TableModel() {
  const { model, OnGetModels, OnDeleteModel } = useModelStore();
  const [modelDelete, setModelDelete] = useState<{
    id: number;
    modelName: string;
  } | null>(null);

  useEffect(() => {
    OnGetModels();
  }, []);
  const handleDelete = (id: number, modelName: string) => {
    setModelDelete({ id, modelName });
  };
  const confirmDelete = () => {
    if (modelDelete) {
      OnDeleteModel(modelDelete.id);
      alert("Model was eliminated");
      setModelDelete(null);
    }
  };

  const cancelDelete = () => {
    setModelDelete(null);
  };
  return (
    <>
      <Layout>
        <>
          <div className="p-10 w-full">
            <CreateModel></CreateModel>
            <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-black table-auto">
              <thead className="text-xs text-black uppercase bg-blue-500  dark:text-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
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
                {model.map((model) => (
                  <tr className="bg-white" key={model.id}>
                    <td className="px-6 py-4">{model.id}</td>
                    <td className="px-6 py-4">{model.typemodel}</td>
                    <td className="px-4 py-2 flex items-center justify-around">
                      <UpdateModel
                        modelId={model.id}
                        modelNameUpdate={model.typemodel}
                      ></UpdateModel>
                      <button
                        onClick={() => handleDelete(model.id, model.typemodel)}
                        className="text-red-500 bg-white"
                      >
                        <FaTrash size={22}></FaTrash>
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
                  Are you sure you want to delete the model "
                  {modelDelete.modelName}"?
                </p>
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={confirmDelete}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Delete
                  </button>
                  <button
                    onClick={cancelDelete}
                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full ml-4"
                  >
                    Cancel
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
