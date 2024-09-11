import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';  // Correct import

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrls: ['./userheader.component.css']
})
export class UserheaderComponent {

  constructor(private a: AuthService, private router: Router) { }  // Use Router here

  appName: string = "Film Finder";
  isNavbarCollapsed = true; // Collapsed by default
  
  textColorDark: string = 'text-dark';
  textColorWhite: string = 'text-white';
  isDarkMode: boolean = true;
  logoStyles: Record<string, string> = {
    color: 'white',
    fontSize: '24px',
    fontWeight: '500'
  }

  ngOnInit() { }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.isDarkMode ? this.logoStyles['color'] = 'white' : this.logoStyles['color'] = 'black';
  }

  signout() {
    this.a.logout();
    this.router.navigate(['/home']);  // Use router here
  }

  navigateToMovieInfo() {
    console.log("movieinfo")
    this.router.navigate(['/user-dashboard/user-movieinfo']);  // Use router here
  }
  
  navigateToReview() {
    this.router.navigate(['/review']);  // Use router here
  }

  navigateToAboutUs() {
    this.router.navigate(['/user-dashboard/about-us']);  // Use router here
  }

  navigateToContactUs() {
    this.router.navigate(['/contact-us']);  // Use router here
  }
}