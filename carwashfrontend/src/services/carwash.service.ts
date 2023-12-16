import axios from "axios";
import { API_URL } from "../utils/constants";
import { IGetCarWash,ICreateCarWash,IUpdateCarWash } from "../types/carwash.types";
import { GetToken } from "../utils/authData";

export const get_carwash = async (carwash="") => {
    const { data } = await axios.get<{ carwash: IGetCarWash[] }>(
        `${API_URL}/carwash?type=${carwash}`,
        {
        headers: {
            Authorization: "Bearer "  + GetToken()
        }
      }
    );
    return data;
};

export const create_carwash = async (carwash: ICreateCarWash) => {
    const response = await axios.post(`${API_URL}/carwash`, carwash,
        {
            headers: {
                Authorization: "Bearer "  + GetToken()
            }
        }
    )
    return response.data;
}

export const update_carwash = async (id: number, carwash: IUpdateCarWash) => {
    const {data} = await axios.put<{ok: boolean}>(API_URL + '/carwash/' + id,carwash,
        {
            headers: {
                Authorization: "Bearer "  + GetToken()
            }
        }
    )
    return data;
}

export const delete_carwash = async (id: number) => {
    const response = await axios.delete(`${API_URL}/carwash/${id}`,
        {
            headers: {
                Authorization: "Bearer "  + GetToken()
            }
        }
    )
    return response.data
}