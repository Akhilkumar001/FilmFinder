import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddmovieComponent } from './components/addmovie/addmovie.component';
import { AdminheaderComponent } from './components/adminheader/adminheader.component';
import { ReactiveFormsModule } from '@angular/forms';


import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ListofmoviesComponent } from './components/listofmovies/listofmovies.component';
import { UpdatemovieComponent } from './components/updatemovie/updatemovie.component';
import { UpcomingmoviesComponent } from './components/upcomingmovies/upcomingmovies.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AddmovieComponent,
    AdminheaderComponent,
    ListofmoviesComponent,
    UpdatemovieComponent,
    UpcomingmoviesComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule
    
]
})
export class AdminModule { }
