export interface IGetBrands {
  id: number;
  type: string;
  state: boolean;
}

export interface BrandState{
  brands: IGetBrands[]
  OnGetBrands: (name:string)=> Promise<void>
  OnCreateBrand:(type:string)=>Promise<void>
  OnUpdateBrand: (type: IGetBrands)=>Promise<void> 
  OnDeleteBrand: (id: number)=>Promise<void>
}
export interface BasicResponse {
  ok: boolean;
  msg: string;
}