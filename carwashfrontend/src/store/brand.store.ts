import { IGetBrands } from "./../types/brand.types";
import {
  create_brand,
  get_brands,
  update_brand,
  delete_brand,
} from "../services/brand.service";
import { BrandState } from "../types/brand.types";
import { create } from "zustand";

const useBrandStore = create<BrandState>((set, get) => ({
  brands: [],
  OnGetBrands: async (name: string) => {
    try {
      const data = await get_brands(name);
      set({
        brands: data.brands,
      });
    } catch (error) {
      console.log("error");
    }
  },
  
  OnCreateBrand: async (type: string) => {
    const data = await create_brand(type);
    if (data.ok) {
      get().OnGetBrands("");
    }
  },
  
  //Modificar
  async OnUpdateBrand(type: IGetBrands) {
    const data = await update_brand(type);
    if (data.ok) {
      get().OnGetBrands("");
    }
  },

  async OnDeleteBrand(id: number) {
    const data = await delete_brand(id);
    if (data.ok) {
      get().OnGetBrands("");
    }
  },
}));

export default useBrandStore;
