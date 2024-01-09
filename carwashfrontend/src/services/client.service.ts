import {
  IGetClients,
  IUpdateClient,
  ICreateClient,
} from "../types/client.types";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { GetToken } from "../utils/authData";

export const get_client = async (name = "") => {
  const { data } = await axios.get<{ client: IGetClients[] }>(
    `${API_URL}/client?name=${name}`,
    {
      headers: {
        Authorization: "Bearer " + GetToken(),
      },
    }
  );
  return data;
};

export const create_client = async (client: ICreateClient) => {
  const response = await axios.post(`${API_URL}/client`, client, {
    headers: {
      Authorization: "Bearer " + GetToken(),
    },
  });
  return response.data;
};

export const update_client = async (id: number, client: IUpdateClient) => {
  const { data } = await axios.put<{ ok: boolean; msg: string }>(
    API_URL + "/client/" + id,
    client,
    {
      headers: {
        Authorization: "Bearer " + GetToken(),
      },
    }
  );
  return data;
};

export const delete_client = async (id: number) => {
  const response = await axios.delete(`${API_URL}/client/${id}`, {
    headers: {
      Authorization: "Bearer " + GetToken(),
    },
  });
  return response.data;
};
