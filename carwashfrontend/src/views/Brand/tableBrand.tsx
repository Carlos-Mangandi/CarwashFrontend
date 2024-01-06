import { useEffect, useState } from "react";
import CreateBrand from "./createBrand";
import Layout from "../../components/Layout";
import UpdateBrand from "./updateBrand";
import useBrandStore from "../../store/brand.store";
import { MdDelete } from "react-icons/md";

function TableBrand() {
  const { brands, OnGetBrands, OnDeleteBrand } = useBrandStore();
  const [brandDelete, setBrandDelete] = useState<{
    id: number;
    brandName: string;
  } | null>(null);

  useEffect(() => {
    OnGetBrands("");
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

  const handleSearch = (name: string) => {
    OnGetBrands(name);
  };

  return (
    <>
      <Layout>
        <>
          <div className="p-10 w-full">
            <CreateBrand></CreateBrand>

            <div className="flex justify-start p-5 items-center text-black ">
              <input
                className="pr-3 pl-10 py-2 font-normal placeholder-black   border-none ring-2 "
                type="text"
                placeholder="Buscar...."
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              />
            </div>

            <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-black">
              <thead className="text-xs text-black uppercase  bg-[#0e0e0e] dark:text-white">
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
                {brands.map((brand) => (
                  <tr className="bg-white" key={brand.id}>
                    <td className="px-6 py-4">{brand.id}</td>
                    <td className="px-6 py-4">{brand.type}</td>
                    <td className="px-4 py-2 flex items-center justify-around">
                      <UpdateBrand
                        brandId={brand.id}
                        brandNameUpdate={brand.type}
                      ></UpdateBrand>
                      <button
                        onClick={() => handleDelete(brand.id, brand.type)}
                        className="text-red-500 bg-white border border-red-600 rounded-2xl"
                      >
                        <MdDelete size={35}></MdDelete>
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
                  ¿ Estas Seguro de Querer Eliminar La Marca "
                  {brandDelete.brandName}"?
                </p>
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={confirmDelete}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                  >
                    SI
                  </button>
                  <button
                    onClick={cancelDelete}
                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full ml-4"
                  >
                    NO
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
