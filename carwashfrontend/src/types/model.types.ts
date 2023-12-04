export interface IGetModels {
    id: number
    typemodel: string
    state: boolean
  }
  export interface ModelState{
    model: IGetModels[]
    OnGetModels: ()=> Promise<void>
    OnCreateModel:(typemodel: string)=>Promise<void>
    OnUpdateModel: (typemodel: IGetModels)=>Promise<void> 
    OnDeleteModel: (id: number)=>Promise<void>
  }
  export interface BasicResponse {
    ok: boolean;
    msg: string;
  }