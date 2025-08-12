import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ProfileService } from '../../core/services/profiles/profile.service';
import { Skills } from '../../core/models/profile';

@Component({
  selector: 'app-about',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  skills!:Skills[]

  constructor(private profileService: ProfileService){}

  ngOnInit(){
    this.getSkills()
 
  }

  getSkills(){
    this.profileService.getSkills().subscribe({
      next:(response)=>{
        this.skills = response
        console.log(this.skills)
      }
    })
  }

}
