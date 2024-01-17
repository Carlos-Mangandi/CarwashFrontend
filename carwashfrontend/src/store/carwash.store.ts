import { ICreateCarWash, IUpdateCarWash } from "../types/carwash.types";
import { create } from "zustand";
import { CarWashState } from "../types/carwash.types";
import {
  get_carwash,
  create_carwash,
  update_carwash,
  delete_carwash,
} from "../services/carwash.service";
import { IPagination } from "../types/pagination.types";

const useCarWashStore = create<CarWashState>((set, get) => ({
  carwash: [],
  pagination_carwash: {} as IPagination,
  OnGetCarWash: async (page=1 , limit=5 , carwash="" ) => {
      try {
       const data = await get_carwash(page, limit, carwash)
          set({
            carwash: data.carwash,
              pagination_carwash: {
                total: data.total,
                totalPage: data.totalPage,
                currentPage: data.currentPage,
                nextPage: data.nextPage,
                prevPage: data.prevPage,
                ok: data.ok,
              }
          });
         
      } catch (error) {
          console.log('error');
          set({
            carwash: [],
              pagination_carwash: {
                total: 0,
                totalPage: 0,
                currentPage: 0,
                nextPage: 0,
                prevPage: 0,
                ok: false,
              },
            });
      }
    
  },

  OnCreateCarWash: async (carwash: ICreateCarWash) => {
    try {
      const data = await create_carwash(carwash);
      if (data.ok) {
        get().OnGetCarWash(1,5,"");
      }
    } catch (error) {
      console.log("error");
    }
  },

  OnUpdateCarWash: async (id: number, carwash: IUpdateCarWash) => {
    try {
      const data = await update_carwash(id, carwash);
      if (data.ok) {
        await get().OnGetCarWash(1,5,"");
      }
    } catch (error) {
      console.log("error");
    }
  },

  OnDeleteCarWash: async (id: number) => {
    try {
      const data = await delete_carwash(id);
      if (data.ok) {
        await get().OnGetCarWash(1,5,"");
      }
    } catch (error) {
      console.log("error");
    }
  },
}));

export default useCarWashStore;
