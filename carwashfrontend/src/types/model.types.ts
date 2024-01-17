import { IPagination } from "./pagination.types";

export interface IGetModels {
  id: number;
  typemodel: string;
  state: boolean;
}

export interface ModelState {
  models: IGetModels[];
  pagination_model: IPagination
  OnGetModels: (page: number, limit: number,typemodel: string) => Promise<void>;
  OnCreateModel: (typemodel: string) => Promise<void>;
  OnUpdateModel: (typemodel: IGetModels) => Promise<void>;
  OnDeleteModel: (id: number) => Promise<void>;
}

export interface IGetModelsResponse extends BasicResponse {
  models: IGetModels;
}

export interface BasicResponse {
  ok: boolean;
  msg: string;
}
export interface IGetModelPaginated extends IPagination{
  models: IGetModels[];
}
