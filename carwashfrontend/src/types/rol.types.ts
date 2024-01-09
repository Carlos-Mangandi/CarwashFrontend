import { IPagination } from "./pagination.types";

export interface IGetRoles {
  id: number;
  type: string;
  state: boolean;
}

export interface IGetRol {
  roles: IGetRoles[];
  ok: boolean;
}

export interface CreateRol {
  type: string;
}

export interface IUpdateRol {
  id: number;
  type: string;
}

export interface IGetRolPaginated extends IPagination {
  roles: IGetRoles[];
}
