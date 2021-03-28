import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators,FormBuilder} from '@angular/forms';
import { LoginService } from 'src/app/login.service';
import {UserlogsignService} from '../../userlogsign.service'
import {Router} from '@angular/router'
import {passvalidator} from "./validator"


@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.scss']
})
export class SignupformComponent implements OnInit {
  
 UserForm=new FormGroup({
  email : new FormControl('', [Validators.required, Validators.email]),
  username : new FormControl('',[Validators.maxLength(15)]),
  password:new FormControl('',[Validators.minLength(6)]),
  cnfpassword:new FormControl('',[passvalidator])
 })
// UserForm:FormGroup;


 constructor(private _router:Router,private _logsign:UserlogsignService,private fb:FormBuilder) { }





// this.UserForm=this.fb.group()







  getErrorMessage() {
    if (this.UserForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.UserForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessage2() {
    if (this.UserForm.controls.email.hasError('required')) {
    return 'You must enter a value';
  }
  else return 0;
  }
  hide = true;

  getUser() {
    
  }

  ngOnInit(): void {
  }

  onSubmit(){
    
    // alert("submitted")
    let User={
      email: this.UserForm.controls.email.value,
      username:this.UserForm.controls.username.value,
      password:this.UserForm.controls.password.value
    }
    console.log(User)
    this._logsign.registerUser(User).subscribe(res=>{
      console.log(res=={status:"exists"})
      if(res.status=="exists")
      alert("user already exists")
      else{
        // const routelink=this.UserForm.controls.email+"/(main:dashboard)";
        // console.log(routelink)
        // sessionStorage.setItem("username",this.UserForm.controls.username.toString());
        // sessionStorage.setItem("email",this.UserForm.controls.username.toString());
        sessionStorage.setItem("username",res.username);
        sessionStorage.setItem("email",res.email);
        // localStorage.setItem("category",this.User.category);
       this._router.navigateByUrl('/')
      }
    },err=>{
      console.log(err)
    })
    // localStorage.setItem
   
  }



}
