import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessionExpiredComponent } from '@components/dialog/session-expired/session-expired.component';
import { catchError, throwError } from 'rxjs';
import { AuthStore } from '../../shared/store/auth.store';

export const unAuthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authStore = inject(AuthStore);
  const dialog = inject(MatDialog);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        dialog.open(SessionExpiredComponent).afterClosed().subscribe(() => {
          authStore.logout();
          router.navigate(['/login']);
        });
      }
      return throwError(() => error.error);
    }),
  );
};
