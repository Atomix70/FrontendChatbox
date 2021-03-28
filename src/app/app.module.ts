import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import {HttpClient}
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent, DialogContentExampleDialog } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { LoginformComponent } from './login/loginform/loginform.component';
import { SignupformComponent } from './login/signupform/signupform.component';
import { LoginService } from './login.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HomeComponent } from './home/home.component';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import  {  NgxEmojiPickerModule  }  from  'ngx-emoji-picker';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { AuthguardService } from './authguard.service';
import {MatTabsModule} from '@angular/material/tabs';

import { ModalComponent } from './home/modal/modal.component';
import { Modal2Component } from './home/modal2/modal2.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginformComponent,
    SignupformComponent,
    DialogContentExampleDialog,
    HomeComponent,
    ModalComponent,
    Modal2Component 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDividerModule,
    NgxEmojiPickerModule.forRoot(),
    NgxUiLoaderModule,
    MatSidenavModule,
    MatMenuModule,
    MatExpansionModule,
    HttpClientModule,
    MatTabsModule,
    NgbModule
 

  ],
  providers: [
    LoginService,
    AuthguardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
