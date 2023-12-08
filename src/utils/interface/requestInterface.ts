/* eslint-disable prettier/prettier */
export interface IRequest {
  userEmail: string;
}
export interface IOrdersRequest{
  user: IUser;
}
export interface IUser {
  email: string;
  id: number;
  role: string;
}