import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);

  if (authService.isAutenticated) {
    return true;
  }

  const url = state.url;
  authService.redirectUrl = url;
  inject(Router).navigate(['/login'], { queryParams: { returnUrl: url } });
  return true;
};
