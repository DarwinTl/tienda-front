import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { ApiAuth } from '@api/service/api.auth';
import { AuthStore } from '@shared/store/auth.store';
import { routes } from './app.routes';
import { CoreModule } from './core/core.module';
import { unAuthorizedInterceptor } from './core/interceptors/error.interceptor';
import { tokenInterceptor } from './core/interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([tokenInterceptor, unAuthorizedInterceptor])),
    importProvidersFrom(CoreModule),
    ApiAuth,
    AuthStore,
  ],
};
