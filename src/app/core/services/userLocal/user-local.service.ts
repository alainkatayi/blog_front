import { Injectable } from '@angular/core';
import { AuthLoginResponse } from '../../models/auth';
import { json } from 'stream/consumers';
const SESSION_KEY = 'userSession';
@Injectable({
  providedIn: 'root'
})
export class UserLocalService {

  constructor() { }

  storeUserLocal(response:AuthLoginResponse){
    localStorage.setItem(SESSION_KEY,JSON.stringify(response))
  }
}
