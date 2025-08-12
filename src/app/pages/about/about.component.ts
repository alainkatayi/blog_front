import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ProfileService } from '../../core/services/profiles/profile.service';
import { Certifications, Experiences, Skills } from '../../core/models/profile';

@Component({
  selector: 'app-about',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  skills!:Skills[]
  certifications!:Certifications[]
  experiences!:Experiences[]

  constructor(private profileService: ProfileService){}

  ngOnInit(){
    this.getSkills()
    this.getCertifications()
    this.getExperiences()
 
  }

  getSkills(){
    this.profileService.getSkills().subscribe({
      next:(response)=>{
        this.skills = response
        console.log(this.skills)
      }
    })
  }

  getCertifications(){
    this.profileService.getCertifications().subscribe({
      next:(response)=>{
        this.certifications = response
      }
    })
  }

  getExperiences(){
    this.profileService.getExperiences().subscribe({
      next:(response)=>{
        this.experiences = response
      }
    })
  }


}
