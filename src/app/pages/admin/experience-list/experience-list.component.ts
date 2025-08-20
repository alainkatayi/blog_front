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
  isCurrentJob!:Experiences[]
  currentJbo !:Boolean

  constructor(private profileService:ProfileService) {}

  ngOnInit(){
    this.getExperience()
  }

  getExperience(){
    this.profileService.getExperiences().subscribe({
      next:(response)=>{
        this.experiences = response
        this.isCurrentJob = response
        console.log(response)
      },
      error:(error)=>{
        console.error(error)
      }
    })
  }
}
