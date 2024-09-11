import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { authGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin-guard.guard';
import { userGuardGuard } from './guards/user-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home', pathMatch: 'full'
  },
    {path: 'home',
      component: HomeComponent,
      canActivate:[authGuard]
  },
    {
      path: 'signin',
    component: LoginComponent
    },
      {
    path: 'register',
    component: RegisterComponent,
    canActivate: [userGuardGuard]
  },
  {
    path: 'contactUs',
    component: ContactUsComponent
  },
  {
    path: 'aboutUs',
    component: AboutUsComponent
  }
  ,
  { path: 'admin-dashboard',canActivate:[AdminGuard], loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'user-dashboard', canActivate: [userGuardGuard], loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },

 

  
];
// allprofiles
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
