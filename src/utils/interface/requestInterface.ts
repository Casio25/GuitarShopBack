/* eslint-disable prettier/prettier */

export interface IRequest{
  user: IUserRequest;
  body: any
}
export interface IUserRequest {
  uid: number
  email: string
}