import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { AuthLoginResponse } from '../../../core/models/auth';
import { UserLocalService } from '../../../core/services/userLocal/user-local.service';
import { RouterLink } from '@angular/router';
import { AuthentificationsService } from '../../../core/services/authentifications/authentifications.service';
import { Router,  } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user!:AuthLoginResponse | null
  private router = inject(Router)
  constructor(private userLocalService: UserLocalService, private authentificationService:AuthentificationsService ){}
  
  ngOnInit(){
    this.user = this.userLocalService.getUser()
    if(this.user == null){
      this.router.navigate(['/login'])
    }
    console.log("User",this.user)
  }

  logOut(){
    this.authentificationService.logOut()
    this.router.navigate(['/article-list'])
  }
}