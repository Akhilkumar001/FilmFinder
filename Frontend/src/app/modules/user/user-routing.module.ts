import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserMovieinfoComponent } from './components/user-movieinfo/user-movieinfo.component';
import { UserHomepageComponent } from './components/user-homepage/user-homepage.component';
import { UserReviewComponent } from './components/user-review/user-review.component';
import { UpcomingmoviesComponent } from './components/upcomingmovies/upcomingmovies.component';
const routes: Routes = [
  {
    path: '', component: UserHomepageComponent
  },
  {
    path: 'user-movieinfo/:id', component: UserMovieinfoComponent
  },
  {
    path: 'user-review/:id', component: UserReviewComponent
  },
  {
    path:'upcomingmovies',component:UpcomingmoviesComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
