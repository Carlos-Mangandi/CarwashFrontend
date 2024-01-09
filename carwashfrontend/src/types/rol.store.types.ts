import { IPagination } from "./pagination.types";
import { IGetRoles, IUpdateRol, CreateRol } from "./rol.types";

export interface IRoleStore {
  roles: IGetRoles[];
  pagination_roles: IPagination;
  OnGetRoles: (page: number, limit: number, name: string) => Promise<void>;
  OnCreateRol: (type: CreateRol) => Promise<void>;
  OnUpdateRol: (id: number, type: IUpdateRol) => Promise<boolean | void>;
  OnDeleteRol: (id: number) => Promise<boolean | void>;
  OnGetRolesList: () => Promise<void>;
}
