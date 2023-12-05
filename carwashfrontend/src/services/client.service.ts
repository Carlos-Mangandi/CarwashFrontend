import { IGetClients,  IUpdateClient, ICreateClient } from '../types/client.types';
import axios from "axios";
import { API_URL } from '../utils/constants';


export const get_client = async () => {
    const { data } = await axios.get<{ client: IGetClients[] }>(
      API_URL + "/client",
      {

      }
    );
    return data;
};

export const create_client = async (client: ICreateClient) => {
    const response = await axios.post(`${API_URL}/client`, client,
        {
          
        }
    )
    return response.data;
}

export const update_client = async (id: number, client: IUpdateClient) => {
    const {data} = await axios.put<{ok: boolean}>(API_URL + '/client' + id, client,
        {
          
        }
    )
    return data;
}

export const delete_client = async (id: number) => {
    const response = await axios.delete(`${API_URL}/client/${id}`,
        {
           
        }
    )
    return response.data
}