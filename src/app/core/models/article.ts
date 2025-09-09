import { Category } from "./category";
import { User } from "./user";

export interface Article{
    id:number,
    title:string,
    image:string,
    category:Category
    introduction:string,
    content:string,
    created_at:string,
    created_by:User
}

export interface ArticleResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Article[];
}