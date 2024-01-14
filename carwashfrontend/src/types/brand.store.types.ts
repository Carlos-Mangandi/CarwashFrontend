import { ICreateBrand, IGetBrands, IUpdateBrand } from "./brand.types";
import { IPagination } from "./pagination.types";

export interface IBrandStore {
  brands: IGetBrands[];
  pagination_brands: IPagination;
  OnGetBrands: (page: number, limit: number, name: string) => Promise<void>;
  OnCreateBrand: (type: ICreateBrand) => Promise<void>;
  OnUpdateBrand: (id: number, type: IUpdateBrand) => Promise<boolean | void>;
  OnDeleteBrand: (id: number) => Promise<boolean | void>;
  OnGetBrandsList: () => Promise<void>;
}
