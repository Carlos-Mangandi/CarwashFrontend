import { useEffect, useState } from 'react';
import { get_roles, create_rol, delete_rol, update_rol } from '../services/rol.service';
import { IGetRoles } from '../types/rol.types';

export const useRolStore = () => {
    const [roles, setRoles] = useState<IGetRoles[]>([])

    useEffect(() => {
    OnGetRoles();
    }, []);

    const OnGetRoles = async () => {
        try {
        const data = await get_roles();
        setRoles(data.rol);
        } catch {
            return({

            })
        }
    };

    const OnCreateRol = async (type: string) =>{
        
        try {
            const data = await create_rol(type);
            if (data.ok){
                await OnGetRoles();
            }
        } catch {
            return({

            })
        }
    };

    const OnUpdateRol = async (id: number, type: string) =>{
        try{
            const data = await update_rol(id, type);

            if(data.ok){
                await OnGetRoles();
            }
        }catch(error){
            return({

            })
        }
    };

    const OnDeleteRol = async (id: number) => {
        try{
            const data = await delete_rol(id);
            if (data.ok){
                await OnGetRoles()
            }
        }catch{
            return({

            })
        }
    }

    return{
        roles, 
        OnGetRoles, 
        OnCreateRol, 
        OnUpdateRol,
        OnDeleteRol
    }
}

export default useRolStore