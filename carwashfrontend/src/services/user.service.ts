import axios from 'axios'
import { ICreateUser, IGetUsers, IUpdateUser } from '../types/user.types'
import { API_URL } from '../utils/constants'
import { GetToken } from '../utils/authData'

export const get_users = async (name="") => {
    const { data } = await axios.get<{ user: IGetUsers[] }>(
      `${API_URL}/user?name=${name}`,
      {
        headers: {
            Authorization: "Bearer "  + GetToken()
        } 
      }
    );
    return data;
};

export const create_user = async (user: ICreateUser) => {
    const response = await axios.post(`${API_URL}/user`, user,
        {
            headers: 
            {
                Authorization: "Bearer "  + GetToken()
            } 
        }
    )
    return response.data;
}

export const update_user = async (id: number, user: IUpdateUser) => {
    const {data} = await axios.put<{ok: boolean, msg: string}>(
        API_URL + '/user/' + id, user,
        {
            headers: 
            {
                Authorization: "Bearer "  + GetToken()
            } 
        }
    );
    return data;
}

export const delete_user = async (id: number) => {
    const response = await axios.delete(`${API_URL}/user/${id}`,
        {
            headers: 
            {
                Authorization: "Bearer "  + GetToken()
            } 
        }
    )
    return response.data
}