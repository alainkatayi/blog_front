import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Certifications } from '../../../core/models/profile';
import { ProfileService } from '../../../core/services/profiles/profile.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certification-list',
  imports: [RouterLink,CommonModule],
  templateUrl: './certification-list.component.html',
  styleUrl: './certification-list.component.css'
})
export class CertificationListComponent {
  certifications!:Certifications[]
  certificationId: number = -1;
  DeleteModalOpen = false;
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

    deleteSkill() {
    this.profileService.deleteCertification(this.certificationId).subscribe({
      next: (response) => {
        window.location.reload();
        console.log(response)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  openDeleteModal(id: number) {
    this.DeleteModalOpen = true;
    this.certificationId = id;
  }

  confirmDelete() {
    this.deleteSkill();
    this.closeDeleteModal();
  }

  closeDeleteModal() {
    this.DeleteModalOpen = false;
  }

}
