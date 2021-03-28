import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {environment} from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserlogsignService {

  // loginurl="http://localhost:3000/login";
  // signupurl="http://localhost:3000/user/signup";
  // loginurl="http://localhost:3000/user/login"

  signupurl=environment.SOCKET_ENDPOINT+"/user/signup";
  loginurl=environment.SOCKET_ENDPOINT+"/user/login"



  constructor(private http:HttpClient) { }
  registerUser(user:any)
  {
  return this.http.post<any>(this.signupurl,user)
  }
  loginUser(user:any)
  {
  return this.http.post<any>(this.loginurl,user)
  }

}
