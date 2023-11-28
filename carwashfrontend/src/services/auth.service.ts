import axios from 'axios'
import { API_URL } from '../utils/constants'
import { GetLoginData, Response } from '../types/auth.types'
import { DeleteToken } from '../utils/authData'
import { useNavigate } from 'react-router-dom'

export async function make_login(values: GetLoginData){
    const data = await axios.post<Response>(API_URL + '/login/sign', values)
    return data
}

export async function log_out(){
    DeleteToken();
   
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    navigate('/')
} 