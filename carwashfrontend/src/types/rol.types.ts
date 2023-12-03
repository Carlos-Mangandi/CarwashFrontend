
export interface IGetRoles {
    id: number
    type: string
    state: boolean
}

export interface CreateRol {
    type : string
}

export interface IUpdateUser{
    id: number,
    type: string
}

export interface IRoleStore {
    roles: IGetRoles[];
    OnGetRoles: () => Promise<void>;
    OnCreateRol: (type: string) => Promise<void>;
    OnUpdateRol: (id: number, type: string) => Promise<void>;
    OnDeleteRol: (id: number) => Promise<void>;
}