import { IGetBrandPaginated, ICreateBrand, IUpdateBrand } from "./../types/brand.types";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { GetToken } from "../utils/authData";

export const get_brands = async (page = 1, limit = 5, name = "") => {
  return axios.get<IGetBrandPaginated>(
    `${API_URL}/brand?page=${page}&limit=${limit}&name=${name}`,
    {
      headers: {
        Authorization: "Bearer " + GetToken(),
      },
    }
  );
};

export const create_brands = async (type: ICreateBrand) => {
  return await axios.post<IGetBrandPaginated>(`${API_URL}/brand`, type,
    {
      headers: {
        Authorization: "Bearer " + GetToken(),
      },
    }
  );
};

export const update_brands = async (id: number, brand: IUpdateBrand) => {
  return await axios.put<IGetBrandPaginated>(`${API_URL}/brand/` + id, brand,
    {
      headers: {
        Authorization: "Bearer " + GetToken(),
      },
    }
  );
};

export const delete_brands = async (id: number) => {
  return await axios.delete<IGetBrandPaginated>(
    `${API_URL}/brand/` + id,
    {
      headers: {
        Authorization: "Bearer " + GetToken(),
      },
    }
  );
};

export const get_brands_list = async () => {
  return await axios.get<IGetBrandPaginated>(`${API_URL}/brands`, {
    headers: {
      Authorization: "Bearer " + GetToken(),
    },
  });
};

