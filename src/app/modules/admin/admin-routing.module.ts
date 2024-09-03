import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddmovieComponent } from './components/addmovie/addmovie.component';
const routes: Routes = [{
  path: "", component: AdminDashboardComponent,
  children: [
    {
      path:'addmovie',component: AddmovieComponent
    }
  ]

 
},

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
