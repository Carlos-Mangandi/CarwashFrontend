import { IGetBrands } from './../types/brand.types';
import { create_brand, get_brands, update_brand, delete_brand } from "../services/brand.service";
import { BrandState} from "../types/brand.types";
import { create } from "zustand";

 const useBrandStore = create<BrandState>((set, get) => ({
  brand: [],
  async OnGetBrands() {
    const data = await get_brands();
    if (data.brand) {
      set((state) => ({
        ...state,
        brand: data.brand,
      }));
    } else {
      data.brand = [];
    }
  },
  async OnCreateBrand(type: string) {
    const data = await create_brand(type);
    if (data.ok) {
      get().OnGetBrands();
    }
    
  },
  //Modificar
  async OnUpdateBrand(type: IGetBrands) {
    const data = await update_brand(type);
    if (data.ok) {
      get().OnGetBrands();
    } 
  },
  async OnDeleteBrand(id: number) {
    const data = await delete_brand(id);
    if (data.ok) {
      get().OnGetBrands();
    }
  },
})
)
export default useBrandStore
