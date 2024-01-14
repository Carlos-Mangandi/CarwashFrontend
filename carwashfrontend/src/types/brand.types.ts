import { IPagination } from "./pagination.types";

export interface IGetBrands {
  id: number;
  type: string;
  state: boolean;
}

export interface IGetBrand{
  brands: IGetBrands[],
  ok: boolean;
}

export interface ICreateBrand {
  type: string;
}

export interface IUpdateBrand {
  id: number;
  type: string;
}

export interface IGetBrandPaginated extends IPagination{
  brands: IGetBrands[];
}