import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environnement } from '../../../../environnemnts/environnement';
import { Observable } from 'rxjs';
import { Skills } from '../../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private url = environnement.apiUrl
  constructor(private http: HttpClient) { }

  getSkills():Observable<Skills[]>{
    return this.http.get<Skills[]>(`${this.url}profile/skills/`)
  }


}
