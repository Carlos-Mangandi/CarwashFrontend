import {
  get_users,
  create_users,
  update_users,
  delete_users,
  get_users_list,
} from "../services/user.service";
import { IPagination } from "../types/pagination.types";
import { IUserStore } from "../types/user.store.types";
import { ICreateUser, IUpdateUser } from "../types/user.types";
import { create } from "zustand";

export const useUserStore = create<IUserStore>((set, get) => ({
  users: [],
  pagination_users: {} as IPagination,
  OnGetUsers: async (page = 1, limit = 5, name = "") => {
    get_users(page, limit, name)
    .then(({data}) => {
      set({
        users: data.users,
        pagination_users: {
          total: data.total,
          totalPage: data.totalPage,
          currentPage: data.currentPage,
          nextPage: data.nextPage,
          prevPage: data.nextPage,
          ok: data.ok,
        }
      });
    })
    .catch((error) => {
      console.log(error);
      set({
        users: [],
        pagination_users: {
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

  OnCreateUser: async (user: ICreateUser) => {
    try {
      const data = await create_users(user);
      if (data) {
        get().OnGetUsers(1, 5, "");
      }
    } catch (error) {
      console.log("error");
    }
  },

  OnUpdateUser: async (id: number, user: IUpdateUser) => {
    try {
      const data = await update_users(id, user);
      if (data) {
        await get().OnGetUsers(1, 5, "");
      }
    } catch (error) {
      console.log("error");
    }
  },

  OnDeleteUser: async (id: number) => {
    try {
      const data = await delete_users(id);
      if (data.ok) {
        await get().OnGetUsers(1, 5, "");
      }
    } catch (error) {
      console.log("error");
    }
  },

  OnGetUsersList: async () => {
    get_users_list().then(({ data }) => {
      set({
        users: data.users,
      });
    });
  },
}));

export default useUserStore;
