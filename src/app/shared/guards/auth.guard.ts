import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '@shared/store/auth.store';

export const authGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (authStore.isLogged()) {
    return true;
  }
  return router.createUrlTree(['autenticacion/login']);
};

export const hasLoginGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (!authStore.isLogged()) {
    return true;
  }
  return router.createUrlTree(['mantenimiento']);
}
