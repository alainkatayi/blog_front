import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environnement } from '../../../../environnemnts/environnement';
import { AuthLoginData, AuthLoginResponse } from '../../models/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationsService {
  private url = environnement.apiUrl
  constructor(private http:HttpClient) { }

  login(data:AuthLoginData):Observable<AuthLoginResponse>{
    return this.http.post<AuthLoginResponse>(`${this.url}token/`, data)
  }
}
