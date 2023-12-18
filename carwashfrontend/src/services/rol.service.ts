import axios from "axios";
import {API_URL} from "../utils/constants"
import {  CreateRol, IGetRoles, IUpdateRol } from "../types/rol.types";
import { GetToken } from "../utils/authData";

export const get_roles = async (type="") => {
    const { data } = await axios.get<{ rol: IGetRoles[] }>(
      `${API_URL}/rol?type=${type}`,
      {
        headers: {
            Authorization: "Bearer "  + GetToken()
        } 
      }
    );
    return data;
};

export const create_rol = async (type: CreateRol)=> {
    const response = await axios.post<{ok:boolean, msg: string}>(
        API_URL + "/rol", {type,},
        {
            headers: {
                Authorization: "Bearer "  + GetToken()
            } 
        }
    )

   return response.data;
}

export const update_rol = async (id: number, type: IUpdateRol) => {
    const {data} = await axios.put<{ok:boolean, msg: string}>(
        API_URL + "/rol/" + id, {type, },
        {
            headers: {
                Authorization: "Bearer "  + GetToken()
            } 
        }
    );
    return data
}

export const delete_rol = async (id: number) => {
    const {data} = await axios.delete<{ok: boolean, msg:string}>(
        API_URL + "/rol/" + id,
        {
            headers: {
                Authorization: "Bearer "  + GetToken()
            } 
        }
    );
    return data
}

export const get_rol_id = async (id: number) => {
    const { data } = await axios.get<{ roles: IGetRoles[] }>(
        API_URL + "/rol" + id,
        {
            headers: {
                Authorization: "Bearer "  + GetToken()
            } 
        }
    );
    return data;
  };