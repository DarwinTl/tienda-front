import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthStore } from '@shared/store/auth.store';

export const existTokenGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  // const jwt = inject(JwtService);
  // const router = inject(Router);
  authStore.findCookie();
  console.log({ authStore, token: authStore.token() });
  console.log('existTokenGuard');

  return true;
  // if (!authStore.isLogged()) {
  //   return true;
  // }
  // if (jwt.authorities().includes(Role.ADMIN)) {
  //   return router.createUrlTree(['mantenimiento']);
  // }
  // return router.createUrlTree(['/']);
};
