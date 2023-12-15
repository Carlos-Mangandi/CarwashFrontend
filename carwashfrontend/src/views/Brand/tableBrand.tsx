import { useEffect, useState } from "react";
import CreateBrand from "./createBrand";
import Layout from "../../components/Layout";
import UpdateBrand from "./updateBrand";
import { FaTrash } from "react-icons/fa";
import useBrandStore from "../../store/brand.store";

function TableBrand() {
  const { brands, OnGetBrands, OnDeleteBrand } = useBrandStore();
  const [brandDelete, setBrandDelete] = useState<{
    id: number;
    brandName: string;
  } | null>(null);

  useEffect(() => {
    OnGetBrands();
  }, []);
  const handleDelete = (id: number, brandName: string) => {
    setBrandDelete({ id, brandName });
  };
  const confirmDelete = () => {
    if (brandDelete) {
      OnDeleteBrand(brandDelete.id);
      setBrandDelete(null);
    }
  };

  const cancelDelete = () => {
    setBrandDelete(null);
  };

  return (
    <>
      <Layout>
        <>
          <div className="p-10 w-full">
            <CreateBrand></CreateBrand>
            <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-black">
              <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-blue-500 dark:text-white">
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
                {brands.map((brands) => (
                  <tr className="bg-white" key={brands.id}>
                    <td className="px-6 py-4">{brands.id}</td>
                    <td className="px-6 py-4">{brands.type}</td>
                    <td className="px-4 py-2 flex items-center justify-around">
                      <UpdateBrand
                        brandId={brands.id}
                        brandNameUpdate={brands.type}
                      ></UpdateBrand>
                      <button
                        onClick={() => handleDelete(brands.id, brands.type)}
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
          {brandDelete && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <p>
                  Are you sure you want to delete the brand "
                  {brandDelete.brandName}"?
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
export default TableBrand;
