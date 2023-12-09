import axios from "axios";
import { API_URL } from "../utils/constants";
import { IGetModels, BasicResponse } from "../types/model.types";
import { GetToken } from "../utils/authData";

export const get_models = async () => {
  const { data } = await axios.get<{ model: IGetModels[] }>(
    API_URL + "/model",
    {
      headers: {
          Authorization: "Bearer "  + GetToken()
      } 
    }
  );
  return data;
};
export const create_model = async (typemodel: string) => {
  const { data } = await axios.post<BasicResponse>(API_URL + "/model", {typemodel,},
  {
    headers: {
        Authorization: "Bearer "  + GetToken()
    } 
  }
  
  );

  return data;
};
export const update_model = async (typemodel: IGetModels) => {
  const { data } = await axios.put<{ ok: boolean; msg: string }>(
    API_URL + "/model/" + typemodel.id,
    typemodel,
    {
      headers: {
          Authorization: "Bearer "  + GetToken()
      } 
    }
  );
  return data;
};
export const delete_model = async (id: number) => {
  const { data } = await axios.delete<{ ok: boolean; msg: string }>(
    API_URL + "/model/" + id,
    {
      headers: {
          Authorization: "Bearer "  + GetToken()
      } 
    }
  );
  return data;
};
