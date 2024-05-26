import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { debounceTime, pipe, switchMap, tap } from 'rxjs';

import { ApiReqPostLogin } from '@api/interface/api.auth';
import { ApiAuth } from '@api/service/api.auth';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ApiError } from '@shared/models/error.model';
import { jwtDecode } from 'jwt-decode';

type AuthState = {
  isLoading: boolean;
  token: string | null;
  correo: string;
  password: string;
  error: string | null;
};

const initialState: AuthState = {
  isLoading: false,
  token: null,
  correo: '',
  password: '',
  error: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ token }) => ({
    isLogged: computed(() => token() !== null),
    email: computed(() => {
      const tokenValue = token();
      if (tokenValue === null) return null;
      return jwtDecode(tokenValue).sub as string;
    }),
  })),
  withMethods((store, apiAuth = inject(ApiAuth)) => ({
    login: rxMethod<ApiReqPostLogin>(
      pipe(
        tap((payload) =>
          patchState(store, { ...payload, isLoading: true, error: null }),
        ),
        debounceTime(500),
        switchMap((payload) =>
          apiAuth.postLogin({ ...payload }).pipe(
            tapResponse({
              next: ({ token }) => {
                localStorage.setItem('token', token);
                patchState(store, { token, error: null });
              },
              error: ({ mensaje }: ApiError) =>
                patchState(store, { ...initialState, error: mensaje }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    logout: () => {
      localStorage.removeItem('token');
      patchState(store, { token: null });
    },
    findCookie: () => {
      const token = localStorage.getItem('token');
      if (token !== null) patchState(store, { token });
    },
    restoreError: () => patchState(store, { error: null }),
  })),
);
