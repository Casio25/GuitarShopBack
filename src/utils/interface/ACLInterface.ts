import { Permission } from "@src/logic/Dto/auth/create-ACL.dto";

export interface ICreateACL {
    resource: string;
    permission: Permission;
}