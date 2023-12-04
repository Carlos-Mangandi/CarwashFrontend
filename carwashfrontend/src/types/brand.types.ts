export interface IGetBrands {
    id: number
    type: string
    state: boolean
  }
  export interface BrandState{
    brand: IGetBrands[]
    OnGetBrands: ()=> Promise<void>
    OnCreateBrand: (type:string)=>Promise<void>
    OnUpdateBrand: (type: IGetBrands)=>Promise<void> 
    OnDeleteBrand: (id: number)=>Promise<void>
  }
  export interface BasicResponse {
    ok: boolean;
    msg: string;
  }