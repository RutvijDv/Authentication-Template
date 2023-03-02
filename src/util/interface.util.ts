import { Request } from "express";

//Interface for token decode
export interface ILoginToken {
    id: string;
    email: string;
}
  
export interface IRegisterToken {
    firstName: string;
    lastName: string;
    email: string;
    phone: number
    password: string;
}


//Interface for User
export interface IUserWithPassword {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: number
    password: string;
    userRole: string;
}

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: number
    password: string;
    userRole: string;
}
  
//Interface for modified Request
export interface ILoginRequest extends Request {
    email: string;
    password: string;
}
  
export interface IRegisterRequest extends Request{
    firstName: string;
    lastName: string;
    email: string;
    phone: number
    password: string;
}

export interface IForgetRequest extends Request{
    email: string;
}

export interface IResetRequest extends Request{
    oldPassword: string;
    newPassword: string;
}

export interface IUserRequest extends Request{
    user?: IUser | Document;
}

export interface IUpdateProfileRequest extends Request{
    firstName: string;
    lastName: string;
    phone: number
}


//Interface File
export interface IFile {
    id: string;
    url: string;
    key: string;
}

export interface ICreateFile {
    url: string;
    key: string;
}

