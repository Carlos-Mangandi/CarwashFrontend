import { get_cars, create_car, update_car, delete_car } from '../services/car.service';
import {  ICreateCar, IUpdateCar } from '../types/car.types';
import { CarState } from '../types/car.types';
import { create } from 'zustand';

const useCarStore = create<CarState>((set, get) => ({
    car: [],
    async OnGetCar() {
      const data = await get_cars();
      if (data.car) {
        set((state) => ({
          ...state,
          car: data.car,
        }));
      } else {
        data.car = [];
      }
    },
     OnCreateCar:async(car:ICreateCar) =>{
      const data = await create_car(car);
      if (data.ok) {
        get().OnGetCar();
      }
      
    },
    //Modificar
     OnUpdateCar: async (id:number, car: IUpdateCar)=> {
      const data = await update_car(id, car);
      if (data.ok) {
        get().OnGetCar();
      } 
    },
    async OnDeleteCar(id: number) {
      const data = await delete_car(id);
      if (data.ok) {
        get().OnGetCar();
      }
    },
  })
  )
  export default useCarStore