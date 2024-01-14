import { useEffect, useState } from "react";
import CreateBrand from "./createBrand";
import Layout from "../../components/Layout";
import UpdateBrand from "./updateBrand";
import useBrandStore from "../../store/brand.store";
import { MdDelete } from "react-icons/md";

function TableBrand() {
  const { brands, OnGetBrands, OnDeleteBrand, pagination_brands } =
    useBrandStore();
  const [brandDelete, setBrandDelete] = useState<{
    id: number;
    brandName: string;
  } | null>(null);

  const [displayCount, setDisplayCount] = useState(5);

  useEffect(() => {
    OnGetBrands(1, displayCount, "");
  }, [OnGetBrands, displayCount]);

  const handleDelete = (id: number, brandName: string) => {
    setBrandDelete({ id, brandName });
  };

  const confirmDelete = () => {
    if (brandDelete) {
      OnDeleteBrand(brandDelete.id).then(() => {
        OnGetBrands(displayCount, 5, "");
        setBrandDelete(null);
      });
    }
  };

  const cancelDelete = () => {
    setBrandDelete(null);
  };

  const handleSearch = (name: string) => {
    OnGetBrands(1, 5, name);
  };

  const handleDisplayCountChange = (event: { target: { value: string } }) => {
    const newDisplayCount = parseInt(event.target.value, 10);
    setDisplayCount(newDisplayCount);
  };

  const handleNext = () => {
    console.log("Current Page:", pagination_brands.currentPage);
    console.log("Total Pages:", pagination_brands.totalPage);

    if (pagination_brands.currentPage < pagination_brands.totalPage) {
      OnGetBrands(pagination_brands.currentPage + 1, displayCount, "");
    }
  };

  const handlePrev = () => {
    console.log("Current Page:", pagination_brands.currentPage);
    console.log("Total Pages:", pagination_brands.totalPage);

    if (pagination_brands.currentPage > 1) {
      OnGetBrands(pagination_brands.currentPage - 1, displayCount, "");
    }
  };

  console.log("Is Prev Button Disabled:", pagination_brands.currentPage === 1);
  console.log(
    "Is Next Button Disabled:",
    pagination_brands.currentPage === pagination_brands.totalPage
  );

  return (
    <>
      <Layout>
        <>
          <div className="p-10 w-full">
          <div className="flex flex-col">
            <div className="w-full">
            <CreateBrand></CreateBrand>

            <div className="flex justify-between p-5 items-center text-black ">
              <input
                className="pr-3 pl-10 py-2 font-normal placeholder-black   border-none ring-2 "
                type="text"
                placeholder="Buscar...."
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              />
              <div className="flex items-center">
                <p className="text-sm font-semibold text-gray-800 mr-4">
                  Cantidad a mostrar
                </p>
                <select
                  className="py-2 text-sm font-semibold border outline-none rounded-xl"
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
              <tbody className="bg-white divide-y divide-gray-300">
                {brands.map((brand) => (
                  <tr className="bg-white" key={brand.id}>
                    <td className="px-4 py-2 font-normal">{brand.id}</td>
                    <td className="px-4 py-2 font-normal">{brand.type}</td>
                    <td className="flex items-center justify-center space-x-5">
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
            </div>
          </div>
          {brandDelete && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <p>
                  ¿Estás seguro de eliminar la marca :{brandDelete.brandName} ?
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

          <div className="pagination-controls flex items-center justify-center space-x-4">
            <button
              className={`px-4 py-2 border rounded-full shadow-md transition-transform transform hover:scale-105 ${
                pagination_brands.currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-700"
              }`}
              onClick={handlePrev}
              disabled={pagination_brands.currentPage === 1}
            >
              Atrás
            </button>
            <span className="text-xl font-semibold text-gray-700">
              Página {pagination_brands.currentPage} de{" "}
              {pagination_brands.totalPage}
            </span>
            <button
              className={`px-4 py-2 border rounded-full shadow-md transition-transform transform hover:scale-105 ${
                pagination_brands.currentPage === pagination_brands.totalPage
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-700"
              }`}
              onClick={handleNext}
            >
              Siguiente
            </button>
          </div>
        </>
      </Layout>
    </>
  );
}
export default TableBrand;
