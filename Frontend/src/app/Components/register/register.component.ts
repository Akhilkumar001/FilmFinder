import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from '../../Services/auth.service';
import { User } from 'src/app/models/User';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  profilePicture: string | ArrayBuffer | null = null;

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      location: ['', [Validators.required]],
      profilePicture: ['']
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, password, dob, location } = this.registerForm.value;
      const user:User= {
        uid: uuidv4(),
        firstName,
        lastName,
        email,
        password,
        dob,
        userType: 'user',
        location,
        profilePicture: this.profilePicture
      };
      this.authService.register(user);
      console.log('User Registered:', user);
      alert('User Registered Sucessfully : )');
      this.router.navigate(['/signin']); 
    } else {
      console.log('Form is invalid');
      alert("Please Enter Details In Correct Format  :( ")
    }
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicture = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
