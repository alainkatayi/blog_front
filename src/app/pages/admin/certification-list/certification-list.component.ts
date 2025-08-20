import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Certifications } from '../../../core/models/profile';
import { ProfileService } from '../../../core/services/profiles/profile.service';

@Component({
  selector: 'app-certification-list',
  imports: [RouterLink],
  templateUrl: './certification-list.component.html',
  styleUrl: './certification-list.component.css'
})
export class CertificationListComponent {
  certifications!:Certifications[]

  constructor(private profileService:ProfileService){}


  ngOnInit(){
    this.getCertifications()
  }
  getCertifications(){
    this.profileService.getCertifications().subscribe({
      next:(response)=>{
        this.certifications = response
        console.log("certification récuperé", response);
        
      },
      error:(error)=>{
        console.error("erreur lors de la récupération des certificats",error)
      }
    })
  }

}
