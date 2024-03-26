import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ForgotPasswodComponent } from './pages/forgot-passwod/forgot-passwod.component';


const routes: Routes = [
  {path:'',component:HomepageComponent},
  {path:'forgot-password',component:ForgotPasswodComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
