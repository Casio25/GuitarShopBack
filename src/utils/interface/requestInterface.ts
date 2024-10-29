/* eslint-disable prettier/prettier */
export interface IRequest {
  userEmail: string;
}
export interface IOrdersRequest{
  user: IUserRequest;
  body: any
}
export interface IUserRequest {
  uid: number
  email: string
}