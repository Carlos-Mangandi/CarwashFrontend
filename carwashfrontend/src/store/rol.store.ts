import { get_roles, create_rol, delete_rol, update_rol } from "../services/rol.service";
import { CreateRol, IRoleStore, IUpdateRol } from "../types/rol.types";
import { create } from "zustand";

export const useRolesStore = create<IRoleStore>((set, get) => ({
  roles: [],
  totalRoles: 0,
  limit: 30,
  page: 1,
  OnGetRoles: async (type: string) => {
    try {
      const data = await get_roles(type);
      set({
        roles: data.roles,
      });
    } catch (error) {
      console.log("error");
    }
  },
  OnCreateRol: async (type: CreateRol) => {
    try {
      const data = await create_rol(type);
      if(data.ok){
        get().OnGetRoles('');
      }
       
    } catch (error) {
      console.log("error");
    }
  },
  OnUpdateRol: async (id: number, type: IUpdateRol) => {
    try {
      const data = await update_rol(id, type);
      if (data.ok) {
        await get().OnGetRoles('');
      }
    } catch (error) {
      console.log("error");
    }
  },
  OnDeleteRol: async (id: number) => {
    try {
      const data = await delete_rol(id);
      if (data.ok) {
        await get().OnGetRoles('');
      }
    } catch (error) {
      console.log("error");
    }
  },
}));

export default useRolesStore;
