import { Category } from './category';
export interface Skills{
    id:number
    category:Category
    name:string
    created_at:string
}


export interface Certifications{
    id:number
    name:string
    organisme:string
    obtaining_date:string
}
