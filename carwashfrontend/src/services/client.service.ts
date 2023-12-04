import { IGetClients, BasicResponse, IUpdateClient, ICreateClient } from '../types/client.types';
import axios from 'axios';
import { API_URL } from '../utils/constants';

export const get_client = async () => {
    const { data } = await axios.get<{ client: IGetClients[] }>(
      API_URL + "/client",
      {}
    );
    return data;
  };
  export const create_client = async (client:ICreateClient) => {
    const { data } = await axios.post<BasicResponse>(API_URL + "/client", {
      client
    });
  
    return data;
  };
  export const update_client = async (id:number , client: IUpdateClient) => {
    const { data } = await axios.put<{ ok: boolean; msg: string }>(
      API_URL + "/client/" + id, client,
    );
    return data;
  };
  export const delete_client = async (id: number) => {
    const { data } = await axios.delete<{ ok: boolean; msg: string }>(
      API_URL + "/client/" + id,
    );
    return data;
  };