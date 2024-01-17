import { ModelState } from "../types/model.types";
import {
  get_models,
  create_model,
  update_model,
  delete_model,
} from "../services/model.service";
import { create } from "zustand";
import { IGetModels } from "../types/model.types";
import { IPagination } from "../types/pagination.types";

const useModelStore = create<ModelState>((set, get) => ({
  models: [],
pagination_model: {} as IPagination,
OnGetModels: async (page=1 , limit=5, name:string) => {
  try {
   const data = await get_models(page,limit, name)
      set({
          models: data.models,
          pagination_model: {
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
          models: [],
          pagination_model: {
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
   


  async OnCreateModel(typemodel: string) {
    const data = await create_model(typemodel);
    if (data.ok) {
      get().OnGetModels(1,5,"");
    }
  },

  //Modificar
  async OnUpdateModel(typemodel: IGetModels) {
    const data = await update_model(typemodel);
    if (data.ok) {
      get().OnGetModels(1,5,"");
    }
  },

  async OnDeleteModel(id: number) {
    const data = await delete_model(id);
    if (data.ok) {
      get().OnGetModels(1,5,"");
    }
  },
}));

export default useModelStore;
