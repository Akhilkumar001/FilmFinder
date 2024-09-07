import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';

import { Router } from '@angular/router';

export const userGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentUser = authService.getLoggedInUser();

  if (currentUser && currentUser.userType === 'user') {
    return true;
  } else {
    router.navigate(['/signin']);
    return false;
  }
};



