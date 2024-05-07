import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { debounceTime, finalize, pipe, switchMap, tap } from "rxjs";

import { ApiReqPostLogin } from "@api/interface/api.auth";
import { ApiAuth } from "@api/service/api.auth";
import { rxMethod } from "@ngrx/signals/rxjs-interop";

type AuthState = {
    isLoading: boolean,
    token: string | null;
    correo: string;
    password: string;
};

const initialState: AuthState = {
    isLoading: false,
    token: null,
    correo: '',
    password: '',
};

export const AuthStore = signalStore(
    // { provideIn: 'root' },
    withState(initialState),
    withComputed(({ token }) => ({
        isLogged: computed(() => token() !== null),
    })),
    withMethods((store, apiAuth = inject(ApiAuth)) => ({
        login: rxMethod<ApiReqPostLogin>(
            pipe(
                tap(payload => patchState(store, {...payload, isLoading: true})),
                debounceTime(500),
                switchMap(payload => apiAuth.postLogin({...payload}).pipe(
                    tap(({ token }) => patchState(store, { token })),
                    finalize(() => patchState(store, { isLoading: false })),
                )),
            )
        )
    }))
);

