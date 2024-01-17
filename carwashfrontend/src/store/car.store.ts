import {
  get_car,
  create_car,
  update_car,
  delete_car,
} from "../services/car.service";
import { ICreateCar, IUpdateCar } from "../types/car.types";
import { CarState } from "../types/car.types";
import { create } from "zustand";
import { IPagination } from '../types/pagination.types';


const useCarStore = create<CarState>((set, get) => ({
  cars: [],
  pagination_car: {} as IPagination,

  OnGetCar: async (page=1 , limit=5,color:string) => {
    try {
      const data = await get_car(page,limit,color)
         set({
             cars: data.cars,
             pagination_car: {
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
             cars: [],
             pagination_car: {
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

  OnCreateCar: async (car: ICreateCar) => {
    try {
      const data = await create_car(car);
      if (data.ok) {
        get().OnGetCar(1,5,"");
      }
    } catch (error) {
      console.log("error");
    }
  },

  OnUpdateCar: async (id: number, car: IUpdateCar) => {
    try {
      const data = await update_car(id, car);
      if (data.ok) {
        await get().OnGetCar(1,5,"");
      }
    } catch (error) {
      console.log("error");
    }
  },

  OnDeleteCar: async (id: number) => {
    try {
      const data = await delete_car(id);
      if (data.ok) {
        await get().OnGetCar(1,5,"");
      }
    } catch (error) {
      console.log("error");
    }
  },
}));

export default useCarStore;
