import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { User } from 'src/app/models/User';
import { ToastMessagesService } from 'src/app/Services/toast-messages.service';
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
    private router: Router,
    private toast:ToastMessagesService
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      profilePicture: new FormControl(null)
    });
  
    // Apply the custom validator after the form group is initialized
    this.registerForm.setValidators(this.passwordMatchValidator);
  }
  
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
  
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, password, dob, location } = this.registerForm.value;
      const user:User= {
        firstName,
        lastName,
        email,
        password,
        dob,
        userType: 'user',
        location,
        profilePicture: this.profilePicture
      };
      this.authService.register(user).subscribe(res=>{
        console.log(res);
      })
      console.log('User Registered:', user);
      setTimeout(()=>
      {
        this.router.navigate(['/signin']); 
      },4000)
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
