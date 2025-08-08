import { Article } from "./article";

export interface PaginatedResponse{
  count: number;
  next: string | null;
  previous: string | null;
  results: Article[]
}