import { User } from "./user"

export interface AuthLoginResponse{
    refresh:string
    access:string
    user:User[]
}

