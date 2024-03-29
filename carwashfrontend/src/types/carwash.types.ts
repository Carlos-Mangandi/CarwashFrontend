import { IPagination } from "./pagination.types";

export interface IGetCarWash {
  id: number;
  type: string;
  price: number;
  amount: number;
  total: number;
  clientId: number;

  client: {
    id: number;
    name: string;
    phone: string;
    carId: number;
  };
}

export interface ICreateCarWash {
  type: string;
  price: number;
  amount: number;
  clientId: number;
}

export interface IUpdateCarWash {
  id: number;
  clientId: number;
  type: string;
  price: number;
  amount: number;
}

export interface CarWashState {
  carwash: IGetCarWash[];
  pagination_carwash: IPagination
  OnGetCarWash: (page:number, limit: number, type: string) => Promise<void>;
  OnCreateCarWash: (carwash: ICreateCarWash) => Promise<void>;
  OnUpdateCarWash: (id: number, carwash: IUpdateCarWash) => Promise<void>;
  OnDeleteCarWash: (id: number) => Promise<void>;
}
export interface IGetCarWashPaginated extends IPagination {
  carwash: IGetCarWash[]
}
