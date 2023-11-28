export interface IGetUsers{
    id: number,
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
    email: string,
    password: string,
    rolId: number
}

export interface IUpdateUser{
    id: number,
    email: string,
    password: string,
    rolId: number
}