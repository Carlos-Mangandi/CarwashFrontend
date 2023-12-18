import { get_users, create_user, update_user, delete_user } from '../services/user.service';
import { ICreateUser, IUpdateUser, IUserStore } from '../types/user.types';
import { create } from 'zustand';

export const useUserStore = create<IUserStore>((set, get) => ({
    users: [],
    OnGetUsers: async (name="") => {
        try {
            const data = await get_users(name);
            set({
                users: data.user,
            });
        } catch (error) {
            console.log('error');
        }
    },

    OnCreateUser: async (user: ICreateUser) => {
        try {
            const data = await create_user(user);
            if (data.ok) {
                 get().OnGetUsers('');
            }
        } catch (error) {
            console.log('error');
        }
    },

    OnUpdateUser: async (id: number, user: IUpdateUser) => {
        try {
            const data = await update_user(id, user);
            if (data.ok) {
                await get().OnGetUsers('');
            }
        } catch (error) {
            console.log('error');
        }
    },

    OnDeleteUser: async (id: number) => {
        try {
            const data = await delete_user(id);
            if (data.ok) {
                await get().OnGetUsers('');
            }
        } catch (error) {
            console.log('error');
        }
    },
}));

export default useUserStore;
