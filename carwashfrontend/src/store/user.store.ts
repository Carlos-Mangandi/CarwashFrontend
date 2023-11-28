import { useState, useEffect } from 'react';
import { get_users, create_user, update_user, delete_user } from '../services/user.service';
import { ICreateUser, IGetUsers, IUpdateUser } from '../types/user.types';

const useUserStore = () => {
    const [users, setUser] = useState<IGetUsers[]>([]);

    useEffect(() => {
        OnGetUsers();
    }, []);

    const  OnGetUsers = async () => {
        try{
            const data = await get_users();
            setUser(data.user);
        }
        catch{
            return({

            })
        }
    }

    const OnCreateUser = async (user: ICreateUser) => {
        try {
            const data = await create_user(user);
            if(data.ok){
                await OnGetUsers();
            }
        }
        catch (error){
            return({

            })
        }
    }

    const OnUpdateUser = async (id: number, user: IUpdateUser) => {
        try{
            const data = await update_user(id, user);
            if(data.ok){
                await OnGetUsers();
            }
        }
        catch(error){
            return({

            })
        }
    }

    const OnDeleteUser = async (id: number) => {
        try{
            const data = await delete_user(id);
            if(data.ok){
                await OnGetUsers();
            }
        }
        catch{
            return({

            })
        }
    }

    return {
        users,
        OnGetUsers,
        OnCreateUser,
        OnUpdateUser,
        OnDeleteUser,
    }
}

export default useUserStore