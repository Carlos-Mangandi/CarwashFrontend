import { ICreateBrand, IGetBrands } from "./brand.types";
import { IPagination } from "./pagination.types";

export interface IBrandStore {
  brands: IGetBrands[];
  pagination_brands: IPagination;
  OnGetBrands: (page: number, limit: number, name: string) => Promise<void>;
  OnCreateBrand: (type: ICreateBrand) => Promise<void>;
  OnUpdateBrand: (type: IGetBrands) => Promise<boolean | void>;
  OnDeleteBrand: (id: number) => Promise<boolean | void>;
  OnGetBrandsList: () => Promise<void>;
}
