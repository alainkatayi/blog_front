import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environnement } from '../../../../environnemnts/environnement';
import { Observable } from 'rxjs';
import { Project } from '../../models/project';
import { UserLocalService } from '../userLocal/user-local.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private url = environnement.apiUrl
  constructor(private http:HttpClient , private userLocalService:UserLocalService) { }

  getProjects():Observable<Project[]>{
    return this.http.get<Project[]>(`${this.url}project/project/`)
  }

  createProject(data:FormData){
    const headers= this.userLocalService.getAuthHeaders()
    return  this.http.post(this.url + 'project/create/', data, {headers})
  }
  editProject(id:number,data:FormData){
    const headers = this.userLocalService.getAuthHeaders()
    return this.http.put(this.url + 'project/'+ id +'/update/', data, { headers })
  }

  deleteProject(id:number){
    const headers = this.userLocalService.getAuthHeaders()
    return this.http.delete(this.url + 'project/'+id +'/delete/',{headers})
  }

  getProject(id:number){
    return this.http.get(this.url + 'project/'+ id +'/')
  }
}
