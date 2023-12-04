import { ICreateClient, IUpdateClient } from './../types/client.types';
import { get_client, create_client,update_client,delete_client } from '../services/client.service';
import { create } from 'zustand';
import { ClientState } from '../types/client.types';

const useClientStore = create<ClientState>((set, get) => ({
    client: [],
    async OnGetClient() {
      const data = await get_client();
      if (data.client) {
        set((state) => ({
          ...state,
          client: data.client,
        }));
      } else {
        data.client = [];
      }
    },
    OnCreateClient: async (client: ICreateClient)=> {
      const data = await create_client(client);
      if (data.ok) {
        get().OnGetClient();
      } 
    },
  
    //Modificar
     OnUpdateClient: async (id:number, client: IUpdateClient)=> {
      const data = await update_client(id, client);
      if (data.ok) {
        get().OnGetClient();
      } 
    },
    async OnDeleteClient(id: number) {
      const data = await delete_client(id);
      if (data.ok) {
        get().OnGetClient();
      }
    },
  })
  )
  export default useClientStore