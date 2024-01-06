import { ModelState } from '../types/model.types';
import { get_models, create_model,update_model,delete_model } from '../services/model.service';
import { create } from 'zustand';
import { IGetModels } from '../types/model.types';

const useModelStore = create<ModelState>((set, get) => ({
  models: [],
   OnGetModels: async (typemodel: string)=> {
    try{
      const data = await get_models(typemodel);

      set({
        models: data.models,
      });
    } 
    catch (error){
      console.log("error")
    }
  },
  
  async OnCreateModel(typemodel: string) {
    const data = await create_model(typemodel);
    if (data.ok) {
      get().OnGetModels('');
    }
    
  },
  //Modificar
  async OnUpdateModel(typemodel: IGetModels) {
    const data = await update_model(typemodel);
    if (data.ok) {
      get().OnGetModels('');
    } 
  },
  async OnDeleteModel(id: number) {
    const data = await delete_model(id);
    if (data.ok) {
      get().OnGetModels('');
    }
  },
})
)
export default useModelStore