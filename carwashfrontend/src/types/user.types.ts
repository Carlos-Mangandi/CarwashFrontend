export interface IGetUsers{
    id: number,
    name: string,
    email: string,
    password: string,
    rolId: number,
    state: boolean,

    rol: {
        id: number,
        type: string,
        state: boolean
    }
}

export interface ICreateUser{
    name: string,
    email: string,
    password: string,
    rolId: number
}

export interface IUpdateUser{
    id: number,
    name: string,
    email: string,
    password: string,
    rolId: number
}

export interface IUserStore {
    users: IGetUsers[];
    OnGetUsers: (name:string) => Promise<void>;
    OnCreateUser: (user: ICreateUser) => Promise<void>;
    OnUpdateUser: (id: number, user: IUpdateUser) => Promise<void>;
    OnDeleteUser: (id: number) => Promise<void>;
}