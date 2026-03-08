import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si el Signal dice que está logueado, lo dejamos pasar
  if (authService.isLoggedIn()) {
    return true;
  }

  // Si no, lo redirigimos al login y bloqueamos el acceso
  router.navigate(['/auth/login']);
  return false;
};
