import { IGetBrands, BasicResponse } from "./../types/brand.types";
import axios from "axios";
import { API_URL } from "../utils/constants";

export const get_brands = async () => {
  const { data } = await axios.get<{ brand: IGetBrands[] }>(
    API_URL + "/brand",
    {}
  );
  return data;
};
export const create_brand = async (type: string) => {
  const { data } = await axios.post<BasicResponse>(API_URL + "/brand", {
    type,
  });

  return data;
};
export const update_brand = async (type: IGetBrands) => {
  const { data } = await axios.put<{ ok: boolean; msg: string }>(
    API_URL + "/brand/" + type.id,
    type
  );
  return data;
};
export const delete_brand = async (id: number) => {
  const { data } = await axios.delete<{ ok: boolean; msg: string }>(
    API_URL + "/brand/" + id,
  );
  return data;
};