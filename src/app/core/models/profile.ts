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


export interface Experiences{
    id:number
    job_title:string
    entreprise_name :string
    start_date :string
    end_date:string
    current_job:Boolean
    description:Text
}