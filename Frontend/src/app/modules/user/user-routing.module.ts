import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserMovieinfoComponent } from './components/user-movieinfo/user-movieinfo.component';
import { AboutUsComponent } from 'src/app/Components/about-us/about-us.component';
import { ContactUsComponent } from 'src/app/Components/contact-us/contact-us.component';
import { AuthService } from 'src/app/Services/auth.service';
import { UserHomepageComponent } from './components/user-homepage/user-homepage.component';
import { UserReviewComponent } from './components/user-review/user-review.component';
import { UpcomingmoviesComponent } from './components/upcomingmovies/upcomingmovies.component';
import { UserWatchlistComponent } from './components/user-watchlist/user-watchlist.component';
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
  },
  {
    path:'watchlist/:id', component:UserWatchlistComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
