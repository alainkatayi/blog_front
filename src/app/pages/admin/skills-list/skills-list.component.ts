import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Skills } from '../../../core/models/profile';
import { ProfileService } from '../../../core/services/profiles/profile.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './skills-list.component.html',
  styleUrl: './skills-list.component.css'
})
export class SkillsListComponent {
  skills!: Skills[]
  skillId: number = -1;
  DeleteModalOpen = false;
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.getSkills()
  }

  getSkills() {
    this.profileService.getSkills().subscribe({
      next: (response) => {
        this.skills = response
        console.log("skills", response)
      },
      error: (error) => {
        console.log("erreur", error)
      }
    })
  }

  deleteSkill() {
    this.profileService.deleteSkill(this.skillId).subscribe({
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
    this.skillId = id;
  }

  confirmDelete() {
    this.deleteSkill();
    this.closeDeleteModal();
  }

  closeDeleteModal() {
    this.DeleteModalOpen = false;
  }
}
