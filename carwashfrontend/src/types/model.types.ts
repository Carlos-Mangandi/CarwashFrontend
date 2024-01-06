export interface IGetModels {
  id: number
  typemodel: string
  state: boolean
}
export interface ModelState{
  models: IGetModels[]
  OnGetModels: (typemodel:string)=> Promise<void>
  OnCreateModel:(typemodel: string)=>Promise<void>
  OnUpdateModel: (typemodel: IGetModels)=>Promise<void> 
  OnDeleteModel: (id: number)=>Promise<void>
}

export interface IGetModelsResponse extends BasicResponse{
  models: IGetModels
}

export interface BasicResponse {
  ok: boolean;
  msg: string;
}