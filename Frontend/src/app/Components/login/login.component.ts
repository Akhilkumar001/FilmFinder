import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { ToastMessagesService } from 'src/app/Services/toast-messages.service';

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
    private router: Router,
    private toast: ToastMessagesService
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
      this.authService.login(email, password).subscribe(success => {
        if (success) {
          const currentUser = this.authService.getLoggedInUser();
          if (currentUser) {
            if (currentUser.userType === 'admin') {
              this.router.navigate(['/admin-dashboard']);
            } else if (currentUser.userType === 'user') {
              this.router.navigate(['/user-dashboard']);
            }
          }
        } else {
          this.toast.showError("Invalid Credentials");
          console.error('Invalid email or password');
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}