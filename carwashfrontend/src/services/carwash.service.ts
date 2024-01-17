import axios from "axios";
import { API_URL } from "../utils/constants";
import {
  ICreateCarWash,
  IUpdateCarWash,
  IGetCarWashPaginated
} from "../types/carwash.types";
import { GetToken } from "../utils/authData";

export const get_carwash = async (page=1, limit =5 ,type ="") => {
  const { data } = await axios.get<IGetCarWashPaginated>(
    `${API_URL}/carwash?page=${page}&limit=${limit}&type=${type}`,
    {
      headers: {
        Authorization: "Bearer " + GetToken(),
      },
    }
  );
  return data;
};

export const create_carwash = async (carwash: ICreateCarWash) => {
  const response = await axios.post(`${API_URL}/carwash`, carwash, {
    headers: {
      Authorization: "Bearer " + GetToken(),
    },
  });
  return response.data;
};

export const update_carwash = async (id: number, carwash: IUpdateCarWash) => {
  const { data } = await axios.put<{ ok: boolean }>(
    API_URL + "/carwash/" + id,
    carwash,
    {
      headers: {
        Authorization: "Bearer " + GetToken(),
      },
    }
  );
  return data;
};

export const delete_carwash = async (id: number) => {
  const response = await axios.delete(`${API_URL}/carwash/${id}`, {
    headers: {
      Authorization: "Bearer " + GetToken(),
    },
  });
  return response.data;
};
