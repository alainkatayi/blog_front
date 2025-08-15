import { Component } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { AuthLoginResponse } from '../../../core/models/auth';
import { UserLocalService } from '../../../core/services/userLocal/user-local.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user!:AuthLoginResponse | null
  constructor(private userLocalService: UserLocalService ){}
  
  ngOnInit(){
    this.user = this.userLocalService.getUser()
    console.log("User",this.user)
  }
}