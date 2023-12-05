
export interface IGetRoles {
    id: number
    type: string
    state: boolean
}

export interface CreateRol {
    type : string
}

export interface IUpdateRol{
    id: number,
    type: string
}

export interface IRoleStore {
    roles: IGetRoles[];
    totalRoles: number;
    limit: number;
    page: number;
    OnGetRoles: () => Promise<void>;
    OnCreateRol: (type: CreateRol) => Promise<void>;
    OnUpdateRol: (id: number, type: IUpdateRol) => Promise<void>;
    OnDeleteRol: (id: number) => Promise<void>;
}