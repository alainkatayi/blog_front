import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environnement } from '../../../../environnemnts/environnement';
import { Observable } from 'rxjs';
import { Certifications, Experiences, Skills } from '../../models/profile';
import { UserLocalService } from '../userLocal/user-local.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private url = environnement.apiUrl
  constructor(private http: HttpClient, private userLocaService: UserLocalService) { }

  getSkills(): Observable<Skills[]> {
    return this.http.get<Skills[]>(`${this.url}profile/skills/`)
  }
  createSkills(data: FormData) {
    const headers = this.userLocaService.getAuthHeaders()
    return this.http.post(this.url + 'profile/skills/create/', data, { headers })
  }

  getCertifications(): Observable<Certifications[]> {
    return this.http.get<Certifications[]>(`${this.url}profile/certifications/`)

  }
  createCertification(data:FormData){
    const headers = this.userLocaService.getAuthHeaders()
    return this.http.post(this.url + 'profile/certification/create/', data, { headers })

  }


  getExperiences(): Observable<Experiences[]> {
    return this.http.get<Experiences[]>(`${this.url}profile/experiences/`)
  }
    createExperience(data:FormData){
    const headers = this.userLocaService.getAuthHeaders()
    return this.http.post(this.url + 'profile/experiences/create/', data, { headers })

  }


}
