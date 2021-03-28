import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor() { }
  getToken(){
    return !!sessionStorage.getItem("email")
  }
}
