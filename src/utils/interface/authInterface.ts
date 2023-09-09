/* eslint-disable prettier/prettier */
export interface ICreateAuth {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
}
export interface ISignAuth {
    email: string;
    password: string;
}