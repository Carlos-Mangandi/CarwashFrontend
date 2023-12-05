export interface IGetCars {
    id: number;
    brandId: number;
    modelId: number;
    color: string;
    serialnumber: string;
    state: boolean;
  
    brand: {
      id: number;
      type: string;
      state: boolean;
    };
    model: {
      id: number;
      typemodel: string;
      state: boolean;
    };
  }
  export interface ICreateCar{
    brandId: number,
    modelId: number,
    color:string,
    serialnumber: string
  }
  export interface IUpdateCar{
    id: number,
    brandId: number,
    modelId: number,
    serialnumber: string
  }
  export interface CarState{
    car: IGetCars[]
    OnGetCar: ()=> Promise<void>
    OnCreateCar: (car:ICreateCar)=>Promise<void>
    OnUpdateCar: (id:number, car: IUpdateCar)=>Promise<void>
    OnDeleteCar: (id: number)=>Promise<void>
  }
  
  export interface BasicResponse {
    ok: boolean;
    msg: string;
  }