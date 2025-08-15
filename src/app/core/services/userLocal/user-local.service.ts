import { Injectable } from '@angular/core';
import { AuthLoginResponse } from '../../models/auth';
import { json } from 'stream/consumers';
const SESSION_KEY = 'userSession';
@Injectable({
  providedIn: 'root'
})
export class UserLocalService {

  constructor() { }

  storeUserLocal(response:AuthLoginResponse):void{
    localStorage.setItem(SESSION_KEY,JSON.stringify(response))
  }

  getUser():AuthLoginResponse | null {
    if(typeof localStorage === 'undefined'){
      return null
    }
    const dataUser = localStorage.getItem(SESSION_KEY)
    return dataUser ? JSON.parse(dataUser) as AuthLoginResponse : null
  }
}