import { Component } from '@angular/core';
import { Experiences } from '../../../core/models/profile';
import { ProfileService } from '../../../core/services/profiles/profile.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-experience-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './experience-list.component.html',
  styleUrl: './experience-list.component.css'
})
export class ExperienceListComponent {
  experiences!: Experiences[]
  isCurrentJob!: Experiences[]
  currentJbo !: Boolean
  DeleteModalOpen=false
  experienceId:number=-1

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.getExperience()
  }

  getExperience() {
    this.profileService.getExperiences().subscribe({
      next: (response) => {
        this.experiences = response
        this.isCurrentJob = response
        console.log(response)
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  deleteSkill() {
    this.profileService.deleteExperience(this.experienceId).subscribe({
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
    this.experienceId = id;
  }

  confirmDelete() {
    this.deleteSkill();
    this.closeDeleteModal();
  }

  closeDeleteModal() {
    this.DeleteModalOpen = false;
  }
}
