import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import {environment} from '../environments/environment'



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient) { }
  // alluserurl="http://localhost:3000/user/alluser";
  // blockurl="http://localhost:3000/user/block";
  // muteurl="http://localhost:3000/user/mute";
  // messagesurl="http://localhost:3000/user/messages"

// myipaddress="http://192.168.18.57"

  alluserurl=environment.SOCKET_ENDPOINT+"/user/alluser";
  blockurl=environment.SOCKET_ENDPOINT+"/user/block";
  muteurl=environment.SOCKET_ENDPOINT+"/user/mute";
  messagesurl=environment.SOCKET_ENDPOINT+"/user/messages"
 
  // loginurl="http://localhost:3000/user/login"

  allUser()
  {
  return this.http.get<any>(this.alluserurl)
  }


block(data:any){
return this.http.post<any>(this.blockurl,data)
}

mute(data:any){
  return this.http.post<any>(this.muteurl,data)
  }

messages(data:any){
  return this.http.post<any>(this.messagesurl,data)
}


  // loginUser(user:any)
  // {
  // return this.http.post<any>(this.loginurl,user)
  // }





}
