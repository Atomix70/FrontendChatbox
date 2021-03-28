import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { LoginService } from 'src/app/login.service';
import {UserlogsignService} from '../../userlogsign.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss']
})
export class LoginformComponent implements OnInit {
  LoginForm= new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('',[Validators.minLength(6)])

  })

  getErrorMessage() {
    if (this.LoginForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.LoginForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessage2() {
    if (this.LoginForm.controls.email.hasError('required')) {
    return 'You must enter a value';
  }
  else return 0;
  }
  hide = true;

  constructor(private router:Router,private logserv:UserlogsignService) { }

  ngOnInit(): void {
  }

  onSubmit()
  {
    let User={
      email:this.LoginForm.controls.email.value,
      password:this.LoginForm.controls.password.value
    }
    console.log(User)
    this.logserv.loginUser(User).subscribe(res=>{
      console.log(res)
      console.log(res.status)
      if(res.status=="invalid")
      {
        alert("invalid email or password")
      }
      else if(res.status="undefined") {
        // const routelink=res.email+"/(main:dashboard)";
        // console.log(routelink)
        sessionStorage.setItem("username",res.username);
        sessionStorage.setItem("email",res.email);
        // localStorage.setItem("category",res.category);
       this.router.navigateByUrl('')

      }
      // else{
      //   alert("invalid email or password")
      // }


    },err=>{
      console.log(err)
    })

  

}



}
