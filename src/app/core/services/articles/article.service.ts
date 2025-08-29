
import { Injectable } from '@angular/core';
import { environnement } from '../../../../environnemnts/environnement';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, ArticleResponse } from '../../models/article';
import { PaginatedResponse } from '../../models/pagination';
import { UserLocalService } from '../userLocal/user-local.service';
import { Category } from '../../models/category';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private url = environnement.apiUrl
  constructor(private http:HttpClient, private userLocaService:UserLocalService) { }

  //function pour la récupération des tous les artilces depuis l'api
  getArticles(page:number= 1, page_size=6):Observable<PaginatedResponse>{

    let params = new HttpParams()
      .set('page',page.toString())
      .set('page_size', page_size.toString())
    return this.http.get<PaginatedResponse>(`${this.url}article/?page=${page}`, {params})
  }

  getArticle(id:number):Observable<Article>{
    return this.http.get<Article>(this.url + 'article/' + id)
  }

  getCategories(){
    return this.http.get<Category[]>(this.url + 'article/category-list/')
  }
}
