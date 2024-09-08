import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddmovieComponent } from './components/addmovie/addmovie.component';
import { ListofmoviesComponent } from './components/listofmovies/listofmovies.component';
import { UserDashboardComponent } from '../user/components/user-dashboard/user-dashboard.component';
import { UpdatemovieComponent } from './components/updatemovie/updatemovie.component';
import { UpcomingmoviesComponent } from './components/upcomingmovies/upcomingmovies.component';
const routes: Routes = [
 
  
  {
  path: "", component: AdminDashboardComponent
 
  },

  {
    path: 'upcomingmovies', component: UpcomingmoviesComponent
  },
  {
 path:'addmovie',component: AddmovieComponent
    },
  { path: 'updatemovie/:id', component: UpdatemovieComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
