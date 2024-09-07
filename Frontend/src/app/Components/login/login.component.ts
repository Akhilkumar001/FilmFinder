import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const currentUser = this.authService.getLoggedInUser();
    if (currentUser) {
      if (currentUser.userType === 'admin') {
        this.router.navigate(['/admin-dashboard']);
      } else if (currentUser.userType === 'user') {
        this.router.navigate(['/user-dashboard']);
      }
    }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const loginSuccess = this.authService.login(email, password);

      if (loginSuccess) {
        const currentUser = this.authService.getLoggedInUser();
        if (currentUser) {
          if (currentUser.userType === 'admin') {
            this.router.navigate(['/admin-dashboard']); 
          } else if (currentUser.userType === 'user') {
            this.router.navigate(['/user-dashboard']); 
          }
        }
      } else {
        console.error('Invalid email or password');
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
