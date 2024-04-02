import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ForgotPasswodComponent } from './pages/forgot-passwod/forgot-passwod.component';
import { UploadDataComponent } from './pages/upload-data/upload-data.component';
import { PredictonsComponent } from './pages/predictons/predictons.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'forgot-password', component: ForgotPasswodComponent },
  {
    path: 'upload-data',
    canActivate: [AuthGuardService],
    component: UploadDataComponent
  },
  {
    path: 'prediction',
    canActivate: [AuthGuardService],
    component: PredictonsComponent
  },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  {path:'about',component:AboutComponent},
  { path: '**', component: PageNotFoundComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
