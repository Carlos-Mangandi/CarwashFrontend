import { IGetCars, BasicResponse, IUpdateCar, ICreateCar } from './../types/car.types';
import axios from 'axios';
import { API_URL } from '../utils/constants';

export const get_cars = async () => {
    const { data } = await axios.get<{ car: IGetCars[] }>(
      API_URL + "/car",
      {}
    );
    return data;
  };
  export const create_car = async (car:ICreateCar) => {
    const { data } = await axios.post<BasicResponse>(API_URL + "/car", {
  car
    });
  
    return data;
  };
  export const update_car = async (id:number , car:IUpdateCar) => {
    const { data } = await axios.put<{ ok: boolean; msg: string }>(
      API_URL + "/car/" + id, car
    );
    return data;
  };
  export const delete_car = async (id: number) => {
    const { data } = await axios.delete<{ ok: boolean; msg: string }>(
      API_URL + "/car/" + id,
    );
    return data;
  };