export interface IGetClients {
    id: number
    name: string
    phone: string
    carId: number
    state: boolean
  
    car:{
      brandId:number,
      modelId:number,
      color: string,
      serialnumber: string
  
      brand:{
        id: number,
        type: string
      }
    }
  }
  export interface ICreateClient{
    name:string,
    phone:string
    carId: number
  }
  export interface IUpdateClient{
    id:number,
    name:string,
    phone:string,
    carId: number
  }
  export interface ClientState{
    client: IGetClients[]
    OnGetClient: ()=> Promise<void>
    OnCreateClient:(client:ICreateClient)=>Promise<void>
    OnUpdateClient: (id:number, client: IUpdateClient)=>Promise<void>
    OnDeleteClient: (id: number)=>Promise<void>
  }
  
  export interface BasicResponse {
    ok: boolean;
    msg: string;
  }