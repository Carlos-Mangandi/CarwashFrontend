import { get_car, create_car, update_car, delete_car } from '../services/car.service';
import {  ICreateCar, IUpdateCar } from '../types/car.types';
import { CarState } from '../types/car.types';
import { create } from 'zustand';

const useCarStore = create<CarState>((set, get) => ({
  cars: [],
  OnGetCar: async () => {
      try {
          const data = await get_car();
          set({
              cars: data.car,
          });
      } catch (error) {
          console.log('error');
      }
  },

  OnCreateCar: async (car: ICreateCar) => {
      try {
          const data = await create_car(car);
          if (data.ok) {
               get().OnGetCar();
          }
      } catch (error) {
          console.log('error');
      }
  },

  OnUpdateCar: async (id: number, car: IUpdateCar) => {
      try {
          const data = await update_car(id, car);
          if (data.ok) {
              await get().OnGetCar();
          }
      } catch (error) {
          console.log('error');
      }
  },

  OnDeleteCar: async (id: number) => {
      try {
          const data = await delete_car(id);
          if (data.ok) {
              await get().OnGetCar();
          }
      } catch (error) {
          console.log('error');
      }
  },
}));
export default useCarStore