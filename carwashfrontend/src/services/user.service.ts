import axios from "axios";
import {
  ICreateUser,
  IGetUserPaginated,
  IUpdateUser,
} from "../types/user.types";
import { API_URL } from "../utils/constants";
import { GetToken } from "../utils/authData";

export const get_users = async (page = 1, limit = 5, name = "") => {
  return axios.get<IGetUserPaginated>(
    `${API_URL}/user?page=${page}&limit=${limit}&name=${name}`,
    {
      headers: {
        Authorization: "Bearer " + GetToken(),
      },
    }
  );
};

export const create_users = async (user: ICreateUser) => {
  return await axios.post<IGetUserPaginated>(`${API_URL}/user`, user, {
    headers: {
      Authorization: "Bearer " + GetToken(),
    },
  });
};

export const update_users = async (id: number, user: IUpdateUser) => {
  return await axios.put<IGetUserPaginated>(`${API_URL}/user/` + id, user, {
    headers: {
      Authorization: "Bearer " + GetToken(),
    },
  });
};

export const delete_users = async (id: number) => {
  const { data } = await axios.delete<IGetUserPaginated>(
    `${API_URL}/user/` + id,
    {
      headers: {
        Authorization: "Bearer " + GetToken(),
      },
    }
  );

  return data;
};

export const get_users_list = async () => {
  return await axios.get<IGetUserPaginated>(`${API_URL}/users`, {
    headers: {
      Authorization: "Bearer " + GetToken(),
    },
  });
};
