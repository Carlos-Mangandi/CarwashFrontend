export interface IGetRoles {
    id: number
    type: string
    state: boolean
}

export interface ICreateRol{
    type : string
}

export interface IGetRolesResponse extends IBasicResponse{
    roles: IGetRoles[]
}

export interface IBasicResponse {
    roles(roles: any): unknown
    ok: true
    status : number
}