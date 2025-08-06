import { User } from "./user";

export interface Artilce{
    id:number,
    title:string,
    introduction:string,
    content:string,
    created_at:string,
    created_by:User
}