import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ForgotPasswodComponent } from './pages/forgot-passwod/forgot-passwod.component';
import { UploadDataComponent } from './pages/upload-data/upload-data.component';


const routes: Routes = [
  {path:'',component:HomepageComponent},
  {path:'forgot-password',component:ForgotPasswodComponent},
  {path:'upload-data',component:UploadDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
