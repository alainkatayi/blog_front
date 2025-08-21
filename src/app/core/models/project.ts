import { Category } from "./category"
import { Skills } from "./profile"


export interface Project{
    id:number
    name:string
    description:string
    created_at:string
    status:Boolean
    category:Category
    technology:Skills[]
}