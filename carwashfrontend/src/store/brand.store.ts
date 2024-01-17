import { ICreateBrand, IGetBrands } from "./../types/brand.types";
import {
  create_brands,
  get_brands,
  update_brands,
  delete_brands,
  get_brands_list,
} from "../services/brand.service";
import { IBrandStore } from "../types/brand.store.types";
import { create } from "zustand";
import { IPagination } from "../types/pagination.types";

export const useBrandStore = create<IBrandStore>((set, get) => ({
  brands: [],
  pagination_brands: {} as IPagination,
  OnGetBrands: async (page = 1, limit = 5, name = "") => {
    get_brands(page, limit, name)
      .then(({ data }) => {
        set({
          brands: data.brands,
          pagination_brands: {
            total: data.total,
            totalPage: data.totalPage,
            currentPage: data.currentPage,
            nextPage: data.nextPage,
            prevPage: data.prevPage,
            ok: data.ok,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        set({
          brands: [],
          pagination_brands: {
            total: 0,
            totalPage: 0,
            currentPage: 0,
            nextPage: 0,
            prevPage: 0,
            ok: false,
          },
        });
      });
  },

  OnCreateBrand: async (type: ICreateBrand) => {
    try {
      const data = await create_brands(type);
      if (data) {
        get().OnGetBrands(1, 5, "");
      }
    } catch (error) {
      console.log("error");
    }
  },

  //Modificar
  async OnUpdateBrand( type: IGetBrands) {
    try {
      const data = await update_brands(type);
      if (data) {
        await get().OnGetBrands(1, 5, "");
      }
    } catch (error) {
      console.log("error");
    }
  },

  OnGetBrandsList: async () => {
    get_brands_list().then(({ data }) => {
      set({
        brands: data.brands,
      });
    });
  },

  async OnDeleteBrand(id: number) {
    try {
      const data = await delete_brands(id);
      if (data) {
        await get().OnGetBrands(1, 5, "");
      }
    } catch (error) {
      console.log("error");
    }
  },
}));

export default useBrandStore;
