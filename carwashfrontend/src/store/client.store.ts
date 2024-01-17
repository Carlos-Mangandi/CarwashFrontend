import { ICreateClient, IUpdateClient } from "./../types/client.types";
import {
  get_client,
  create_client,
  update_client,
  delete_client,
} from "../services/client.service";
import { create } from "zustand";
import { ClientState } from "../types/client.types";
import { IPagination } from '../types/pagination.types';



const useClientStore = create<ClientState>((set, get) => ({
  client: [],
  pagination_client: {} as IPagination,
  OnGetClient: async (page=1 , limit=5, name:string,phone:string ) => {
      try {
       const data = await get_client(page,limit, name, phone)
          set({
              client: data.client,
              pagination_client: {
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
              client: [],
              pagination_client: {
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

  OnCreateClient: async (client: ICreateClient) => {
    try {
      const data = await create_client(client);
      if (data.ok) {
        get().OnGetClient(1,5,"","");
      }
    } catch (error) {
      console.log("error");
    }
  },

  OnUpdateClient: async (id: number, client: IUpdateClient) => {
    try {
      const data = await update_client(id, client);
      if (data.ok) {
        await get().OnGetClient(1,5,"","");
      }
    } catch (error) {
      console.log("error");
    }
  },

  OnDeleteClient: async (id: number) => {
    try {
      const data = await delete_client(id);
      if (data.ok) {
        await get().OnGetClient(1,5,"","");
      }
    } catch (error) {
      console.log("error");
    }
  },
}));

export default useClientStore;
