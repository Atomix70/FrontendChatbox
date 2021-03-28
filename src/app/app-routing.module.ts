import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginformComponent } from './login/loginform/loginform.component';
import { SignupformComponent } from './login/signupform/signupform.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationGuard } from './authentication.guard';
const routes: Routes = [

  { path: '', component: HomeComponent,canActivate:[AuthenticationGuard] },
  {path:'login',component:LoginComponent, children:[
  { path: 'login', component: LoginformComponent },
  { path: 'signup', component: SignupformComponent }]}
  
  // { path: 'home', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
