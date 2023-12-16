import { ICreateClient, IUpdateClient } from './../types/client.types';
import { get_client, create_client,update_client,delete_client } from '../services/client.service';
import { create } from 'zustand';
import { ClientState } from '../types/client.types';

const useClientStore = create<ClientState>((set, get) => ({
    client: [],
    OnGetClient: async (name="") => {
        try {
            const data = await get_client(name);
            set({
                client: data.client,
            });
        } catch (error) {
            console.log('error');
        }
    },
  
    
    OnCreateClient: async (client: ICreateClient) => {
        try {
            const data = await create_client(client);
            if (data.ok) {
                 get().OnGetClient('');
            }
        } catch (error) {
            console.log('error');
        }
    },
  
    OnUpdateClient: async (id: number, client: IUpdateClient) => {
        try {
            const data = await update_client(id, client);
            if (data.ok) {
                await get().OnGetClient('');
            }
        } catch (error) {
            console.log('error');
        }
    },
  
    OnDeleteClient: async (id: number) => {
        try {
            const data = await delete_client(id);
            if (data.ok) {
                await get().OnGetClient('');
            }
        } catch (error) {
            console.log('error');
        }
    },
  }));
  export default useClientStore