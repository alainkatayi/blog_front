import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environnement } from '../../../../environnemnts/environnement';
import { Observable } from 'rxjs';
import { Certifications, Experiences, Skills } from '../../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private url = environnement.apiUrl
  constructor(private http: HttpClient) { }

  getSkills():Observable<Skills[]>{
    return this.http.get<Skills[]>(`${this.url}profile/skills/`)
  }

   getCertifications():Observable<Certifications[]>{
    return this.http.get<Certifications[]>(`${this.url}profile/certifications/`)

  }

  
  getExperiences():Observable<Experiences[]>{
    return this.http.get<Experiences[]>(`${this.url}profile/experiences/`)
  }


}
