import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import {BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material/material.module';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './layout/login/login.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './layout/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswodComponent } from './pages/forgot-passwod/forgot-passwod.component';
import { UploadDataComponent } from './pages/upload-data/upload-data.component';
import { PredictonsComponent } from './pages/predictons/predictons.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoaderComponent } from './layout/loader/loader.component';
import { AboutComponent } from './pages/about/about.component';
import { ProfileComponent } from './pages/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswodComponent,
    UploadDataComponent,
    PredictonsComponent,
    ResetPasswordComponent,
    PageNotFoundComponent,
    LoaderComponent,
    AboutComponent,
    ProfileComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
    
    



  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
