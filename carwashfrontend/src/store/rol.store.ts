import {
  get_roles,
  create_roles,
  delete_roles,
  update_roles,
  get_roles_list,
} from "../services/rol.service";
import { IPagination } from "../types/pagination.types";
import { IRoleStore } from "../types/rol.store.types";
import { CreateRol, IUpdateRol } from "../types/rol.types";
import { create } from "zustand";

export const useRolesStore = create<IRoleStore>((set, get) => ({
  roles: [],
  pagination_roles: {} as IPagination,
  OnGetRoles: async (page = 1, limit = 5, name = "") => {
    get_roles(page, limit, name)
      .then(({ data }) => {
        set({
          roles: data.roles,
          pagination_roles: {
            total: data.total,
            totalPage: data.totalPage,
            currentPage: data.currentPage,
            nextPage: data.nextPage,
            prevPage: data.prevPage,
            ok: data.ok,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        set({
          roles: [],
          pagination_roles: {
            total: 0,
            totalPage: 0,
            currentPage: 0,
            nextPage: 0,
            prevPage: 0,
            ok: false,
          },
        });
      });
  },

  OnCreateRol: async (type: CreateRol) => {
    try {
      const data = await create_roles(type);
      if (data) {
        get().OnGetRoles(1, 5, "");
      }
    } catch (error) {
      console.log("error");
    }
  },

  OnUpdateRol: async (id: number, type: IUpdateRol) => {
    try {
      const data = await update_roles(id, type);
      if (data) {
        await get().OnGetRoles(1, 5, "");
      }
    } catch (error) {
      console.log("error");
    }
  },

  OnGetRolesList: async () => {
    get_roles_list().then(({ data }) => {
      set({
        roles: data.roles,
      });
    });
  },

  OnDeleteRol: async (id: number) => {
    try {
      const data = await delete_roles(id);
      if (data.ok) {
        await get().OnGetRoles(1, 5, "");
      }
    } catch (error) {
      console.log("error");
    }
  },
}));

export default useRolesStore;
