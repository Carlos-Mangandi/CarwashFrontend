import { IPagination } from "./pagination.types";
import { ICreateUser, IGetUsers, IUpdateUser } from "./user.types";

export interface IUserStore {
    users: IGetUsers[];
    pagination_users: IPagination;
    OnGetUsers: (page: number, limit: number, name: string) => Promise<void>;
    OnCreateUser: (user: ICreateUser) => Promise<void>;
    OnUpdateUser: (id: number, user: IUpdateUser) => Promise<boolean | void>;
    OnDeleteUser: (id: number) => Promise<void>;
    OnGetUsersList: () => Promise<void>;
  }