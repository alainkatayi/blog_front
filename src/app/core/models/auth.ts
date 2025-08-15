import { User } from "./user"

export interface AuthLoginResponse{
    refresh:string
    access:string
    user:User
}

export interface AuthLoginData{
    username:string
    password:string
}