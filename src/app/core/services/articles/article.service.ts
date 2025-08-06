
import { Injectable } from '@angular/core';
import { environnement } from '../../../../environnemnts/environnement';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleResponse } from '../../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private url = environnement.apiUrl
  constructor(private http:HttpClient) { }

  //function pour la récupération des tous les artilces depuis l'api
  getArticles():Observable<ArticleResponse>{
    return this.http.get<ArticleResponse>(`${this.url}article/`)
  }
}
