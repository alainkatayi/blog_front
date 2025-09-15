import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { AuthLoginResponse } from '../../../core/models/auth';
import { UserLocalService } from '../../../core/services/userLocal/user-local.service';
import { RouterLink } from '@angular/router';
import { AuthentificationsService } from '../../../core/services/authentifications/authentifications.service';
import { Router,  } from '@angular/router';
import { Article } from '../../../core/models/article';
import { ArticleService } from '../../../core/services/articles/article.service';
import { ProjectService } from '../../../core/services/project/project.service';
import { Project } from '../../../core/models/project';
import { ProfileService } from '../../../core/services/profiles/profile.service';
import { Certifications, Experiences, Skills } from '../../../core/models/profile';


@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user!:AuthLoginResponse | null
  articleNumber!:number
  erroMessage=''

  projects!:Project[]
  projectNumber!:number

  skills!:Skills[]
  skillNumber!:number

  experiences!: Experiences[]
  experienceNumber!:number

  certifications!:Certifications[]
  certificationNumber!:number

  
  
  
  private router = inject(Router)
  constructor(private userLocalService: UserLocalService, private authentificationService:AuthentificationsService,private articleService:ArticleService, private projectService:ProjectService,private profileService:ProfileService ){}
  
  ngOnInit(){
    this.user = this.userLocalService.getUser()
    if(this.user == null){
      this.router.navigate(['/login'])
    }
    console.log("User",this.user)
    this.getArticles()
    this.getProject()
    this.getSkills()
    this.getExperience()
    this.getCertifications()
  }

    //function pour la récupération des articles depuis le service article
  getArticles():void{
    this.articleService.getArticles().subscribe({
      next:(response)=>{
        //debug
        console.log("artilces récuperé", response)
        this.articleNumber = response.count
      },

      //cas d'erreur
      error:(error)=>{
        //debug
        console.error("erreur lors de la récupération des articles", error)
        this.erroMessage = error
      }
    })
  }

  getProject():void{
    this.projectService.getProjects().subscribe({
      next: (response) => {
        this.projects = response
        this.projectNumber = this.projects.length
        console.log("project", response)
      },
      error: (error) => {
        console.log("error", error)
      }
    })
  }

  getSkills() {
    this.profileService.getSkills().subscribe({
      next: (response) => {
        this.skills = response
        this.skillNumber = this.skills.length
        console.log("skills", response)
      },
      error: (error) => {
        console.log("erreur", error)
      }
    })
  }

  getExperience() {
    this.profileService.getExperiences().subscribe({
      next: (response) => {
        this.experiences = response
        this.experienceNumber=this.experiences.length
        console.log(response)
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  getCertifications(){
    this.profileService.getCertifications().subscribe({
      next:(response)=>{
        this.certifications = response
        this.certificationNumber = this.certifications.length
        console.log("certification récuperé", response);
        
      },
      error:(error)=>{
        console.error("erreur lors de la récupération des certificats",error)
      }
    })
  }

  logOut(){
    this.authentificationService.logOut()
    this.router.navigate(['/article-list'])
  }
}