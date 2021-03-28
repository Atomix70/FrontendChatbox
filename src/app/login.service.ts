import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }


  userType = 'login';
  getUser(){
    return (this.userType==='login' ? 'signup' : 'login');
    console.log(this.userType);

  }
}
