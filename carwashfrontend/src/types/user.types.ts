export interface IGetUsers{
    id: number,
    name: string,
    email: string,
    password: string,
    rolId: number,
    state: boolean

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