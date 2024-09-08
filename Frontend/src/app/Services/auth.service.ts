import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { ToastMessagesService } from './toast-messages.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly storageKey = 'users';
  private readonly currentUserKey = 'currentUser';

  constructor( private toast:ToastMessagesService,) { }

  register(user: User): void {
    const existingUsers = this.getUsersFromStorage();
    const userExists = existingUsers.some(u => u.email === user.email);
    if (!userExists) {
      existingUsers.push(user);
      localStorage.setItem(this.storageKey, JSON.stringify(existingUsers));
      this.toast.showSuccess("Registration Completed Successfully");
    } else {
      console.error('User already exists');
    }
  }

  login(email: string, password: string): boolean {
    const users = this.getUsersFromStorage();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
  }

  getLoggedInUser(): User | null {
    const user = localStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null;
  }

  private getUsersFromStorage(): User[] {
    const users = localStorage.getItem(this.storageKey);
    return users ? JSON.parse(users) : [];
  }
}
