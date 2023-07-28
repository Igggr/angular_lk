import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LOGIN_PATH, REDIRECT_QUERY } from './const';

export const authGuard: CanActivateFn = async (route, state) => {

  if (inject(AuthService).isAutenticated) {
    return true;
  }

  inject(Router).navigate(
    [`/${LOGIN_PATH}`],
    { queryParams: { [REDIRECT_QUERY]: state.url } }
  );
  return true;
};
