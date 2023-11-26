import axios from "axios";
import {API_URL} from "../utils/constants"
import {  ICreateRol, IGetRolesResponse } from "../types/rol.types";

export const get_roles = (type:string ) => {
    return axios.get<IGetRolesResponse>(API_URL + "/rol"+ type)
}

export const create_rol = async (type: ICreateRol)=> {
    return axios.post<{ok:boolean, msg: string}>(API_URL +"/rol", type)
}

export const delete_rol = async (id: number) =>{
    return axios.delete<{ ok: boolean; msg: string }>(API_URL + "/rol/" + id,);
};