import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Role } from '@shared/enums/role.enum';
import { JwtService } from '@shared/services/jwt.service';
import { AuthStore } from '@shared/store/auth.store';

export const authRoleGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  const jwt = inject(JwtService);

  if (authStore.isLogged() && jwt.authorities().includes(Role.ADMIN)) {
    return true;
  }
  return router.createUrlTree(['autenticacion/login']);
};

export const hasLoginGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  const jwt = inject(JwtService);

  if (authStore.isLogged() && jwt.authorities().includes(Role.ADMIN)) {
    return router.createUrlTree(['mantenimiento']);
  }

  if (!authStore.isLogged()) {
    return true;
  }

  return true;
}
