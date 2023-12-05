import { IGetCars, IUpdateCar, ICreateCar } from '../types/car.types';
import axios from "axios";
import { API_URL } from '../utils/constants';


export const get_car = async () => {
    const { data } = await axios.get<{ car: IGetCars[] }>(
      API_URL + "/car",
      {

      }
    );
    return data;
};

export const create_car = async (car: ICreateCar) => {
    const response = await axios.post(`${API_URL}/car`, car,
        {
          
        }
    )
    return response.data;
}

export const update_car = async (id: number, car: IUpdateCar) => {
    const {data} = await axios.put<{ok: boolean}>(API_URL + '/car' + id, car,
        {
          
        }
    )
    return data;
}

export const delete_car = async (id: number) => {
    const response = await axios.delete(`${API_URL}/car/${id}`,
        {
           
        }
    )
    return response.data
}