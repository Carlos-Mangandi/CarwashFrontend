import { ICreateCarWash, IUpdateCarWash } from "../types/carwash.types";
import { create } from 'zustand';
import { CarWashState } from "../types/carwash.types";
import { get_carwash, create_carwash, update_carwash, delete_carwash } from "../services/carwash.service";


const useCarWashStore = create<CarWashState>((set, get) => ({
    carWash: [],
    OnGetCarWash: async (carwash="") => {
        try {
            const data = await get_carwash(carwash);
            set({
                carWash: data.carwash,
            });
        } catch (error) {
            console.log('error');
        }
    },
  
    OnCreateCarWash: async (carwash: ICreateCarWash) => {
        try {
            const data = await create_carwash(carwash);
            if (data.ok) {
                 get().OnGetCarWash('');
            }
        } catch (error) {
            console.log('error');
        }
    },
  
    OnUpdateCarWash: async (id: number, carwash: IUpdateCarWash) => {
        try {
            const data = await update_carwash(id, carwash);
            if (data.ok) {
                await get().OnGetCarWash('');
            }
        } catch (error) {
            console.log('error');
        }
    },
  
    OnDeleteCarWash: async (id: number) => {
        try {
            const data = await delete_carwash(id);
            if (data.ok) {
                await get().OnGetCarWash('');
            }
        } catch (error) {
            console.log('error');
        }
    },
  }));
  export default useCarWashStore