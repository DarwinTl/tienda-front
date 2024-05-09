import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '@shared/store/auth.store';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  const token = authStore.token();
  return next(handledBearerToken(req, token));
};

const handledBearerToken = (
  req: HttpRequest<unknown>,
  token: string | null,
) => {
  if (token) {
    const headers = req.headers.set('Authorization', `Bearer ${token}`);
    req = req.clone({ headers });
  }
  return req;
};
