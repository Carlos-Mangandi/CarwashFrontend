import { IGetCarPaginated, IUpdateCar, ICreateCar } from "../types/car.types";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { GetToken } from "../utils/authData";

export const get_car = async (page = 1, limit = 5, color: string, serialnumber: string) => {
  const { data } = await axios.get<IGetCarPaginated>(
    `${API_URL}/car?page=${page}&limit=${limit}&color=${color}&serialnumber=${serialnumber}`,
    {
      headers: {
        Authorization: "Bearer " + GetToken(),
      },
    }
  );
  return data;
};

export const create_car = async (car: ICreateCar) => {
  const response = await axios.post(`${API_URL}/car`, car, {
    headers: {
      Authorization: "Bearer " + GetToken(),
    },
  });
  return response.data;
};

export const update_car = async (id: number, car: IUpdateCar) => {
  const { data } = await axios.put<{ ok: boolean }>(
    API_URL + "/car/" + id,
    car,
    {
      headers: {
        Authorization: "Bearer " + GetToken(),
      },
    }
  );
  return data;
};

export const delete_car = async (id: number) => {
  const response = await axios.delete(`${API_URL}/car/${id}`, {
    headers: {
      Authorization: "Bearer " + GetToken(),
    },
  });
  return response.data;
};
