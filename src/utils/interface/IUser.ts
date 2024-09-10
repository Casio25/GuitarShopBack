/* eslint-disable prettier/prettier */
export interface IUser {
    id: number,
    email: string,
    roleId: number
}
export interface IFindUser {
    uid?: number,
    email?: string
}

export interface IDataServiceUser {
    id?: number,
    email?: string
}