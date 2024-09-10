/* eslint-disable prettier/prettier */
export interface IRequest {
  userEmail: string;
}
export interface IOrdersRequest{
  user: IUserRequest;
}
export interface IUserRequest {
  uid: number
}