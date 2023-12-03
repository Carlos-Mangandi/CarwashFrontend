import { get_roles, create_rol, delete_rol, update_rol } from "../services/rol.service";
import { IRoleStore } from "../types/rol.types";
import { create } from "zustand";

export const useRolesStore = create<IRoleStore>((set, get) => ({
  roles: [],
  OnGetRoles: async () => {
    try {
      const data = await get_roles();
      set({
        roles: data.rol,
      });
    } catch (error) {
      console.log("error");
    }
  },
  OnCreateRol: async (type: string) => {
    try {
      await create_rol(type);
      await get().OnGetRoles();
    } catch (error) {
      console.log("error");
    }
  },
  OnUpdateRol: async (id: number, type: string) => {
    try {
      const data = await update_rol(id, type);
      if (data.ok) {
        get().OnGetRoles();
      }
    } catch (error) {
      console.log("error");
    }
  },
  OnDeleteRol: async (id: number) => {
    try {
      const data = await delete_rol(id);
      if (data.ok) {
        await get().OnGetRoles();
      }
    } catch (error) {
      console.log("error");
    }
  },
}));

export default useRolesStore;
