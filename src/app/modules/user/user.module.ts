import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserheaderComponent } from './components/userheader/userheader.component';
import { UserHomepageComponent } from './components/user-homepage/user-homepage.component';
import { UserMovieinfoComponent } from './components/user-movieinfo/user-movieinfo.component';

import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    UserDashboardComponent,
    UserheaderComponent,
    UserHomepageComponent,
    UserMovieinfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    UserRoutingModule,
    MatCardModule
  ]
})
export class UserModule { }



