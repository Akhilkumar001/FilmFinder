import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { ToastMessagesService } from './toast-messages.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly storageKey = 'users';
  private readonly currentUserKey = 'currentUser';
  private apiUrl = 'https://localhost:7025/api/users/login'; // Adjust URL as needed

  constructor( private http: HttpClient,private toast:ToastMessagesService,) { }

  register(user: User): Observable<any> {
    return this.http.post('https://localhost:7025/api/users/register', user, {
      withCredentials: true, // Important for sending cookies/session information
      responseType: 'json'
    })
      .pipe(
        map(response => {
          this.toast.showSuccess("Registration Completed Successfully");
          return response;
        }),
        catchError(error => {
          console.error('Registration error', error);
          return of(null);
        })
      );
  }
  

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<{user: any }>(this.apiUrl, { email, password }, { withCredentials: true })
      .pipe(
        map(response => {
          // Store token and user details in local storage or a service
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          return true;
        }),
        catchError(error => {
          console.error('Login error', error);
          return of(false);
        })
      );
  }
  
  logout(): void {
    localStorage.removeItem(this.currentUserKey);
  }

  getLoggedInUser(){
    const user = localStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null;
  }

  checkSession(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-session`, { withCredentials: true })
      .pipe(
        map(response => {
          return response; // true if session is valid
        }),
        catchError(error => {
          console.error('Session validation error', error);
          return of(false);
        })
      );
  }

}