import { IPagination } from "./pagination.types"

export interface IGetClients {
  id: number;
  name: string;
  phone: string;
  carId: number;
  state: boolean;

  car: {
    brandId: number;
    modelId: number;
    color: string;
    serialNumber: string;
  };
}

export interface ICreateClient {
  name: string;
  phone: string;
  carId: number;
}

export interface IUpdateClient {
  id: number;
  name: string;
  phone: string;
  carId: number;
}

export interface ClientState {
  client: IGetClients[];
  pagination_client: IPagination
  OnGetClient: (page:number, limit: number,name:string) => Promise<void>;
  OnCreateClient: (client: ICreateClient) => Promise<void>;
  OnUpdateClient: (id: number, client: IUpdateClient) => Promise<void>;
  OnDeleteClient: (id: number) => Promise<void>;
}

export interface IGetClientPaginated extends IPagination {
  client: IGetClients[]
}