import { get_roles, create_rol} from '../services/rol.service';
import { IGetRoles, ICreateRol } from '../types/rol.types';
import {defineStore} from "pinia"

export const useRoleStore = defineStore('rol', {
    state:()=>({
        rol:[] as IGetRoles[],
        rol_list:[] as IGetRoles[]
    }),
    actions:{
        OnGetRoles(name:string){
            get_roles(name)
            .then(({data}) =>{
                if(data.ok){
                    this.rol = data.rol
                }
            })
        },

        OnCreateRol(rol: ICreateRol){
            const data = create_rol(rol)
            if(data.then){
                data.then(({data})=>{
                    if(data.ok)
                    alert("Rol created")
                    this.OnGetRoles()
                }                
              )}
        }
    }
})