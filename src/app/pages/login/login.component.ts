import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthentificationsService } from '../../core/services/authentifications/authentifications.service';
import { Router } from 'express';
import { AuthLoginData, AuthLoginResponse } from '../../core/models/auth';
import { UserLocalService } from '../../core/services/userLocal/user-local.service';


@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading= false

  constructor(private fb:FormBuilder, private authService:AuthentificationsService, private userLocalService:UserLocalService){
    this.loginForm = this.fb.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
  }

  onSubmit():void{
    this.isLoading = true
    const data:AuthLoginData = this.loginForm.value

    this.authService.login(data).subscribe({
      next:(response:AuthLoginResponse)=>{
        this.isLoading = false
        this.userLocalService.storeUserLocal(response)
        console.log("Login Response: ", response)
      },

      error:(error)=>{
        this.isLoading = false
        console.log("Login Error", error)
      }
    })
  }

}
