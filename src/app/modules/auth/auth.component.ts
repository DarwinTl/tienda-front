import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiHome } from '@api/service/api-home';
import { ErrorFieldComponent } from '@components/error-field/error-field.component';
import { FormFieldComponent } from '@components/form-field/form-field.component';
import { LoadingComponent } from '@components/loading/loading.component';
import { OnlyLettersDirective } from '@shared/directives/only-letters.directive';
import { OnlyNumbersDirective } from '@shared/directives/only-numbers.directive';
import { Role } from '@shared/enums/role.enum';
import { JwtService } from '@shared/services/jwt.service';
import { AuthStore } from '@shared/store/auth.store';
import { CustomValidatorService } from '@shared/validators/custom-validator.service';
import { AuthRepository } from './repositories/auth-repository';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    MatIcon,
    MatFormField,
    MatInput,
    MatLabel,
    MatSelect,
    MatOption,
    RouterLink,
    ReactiveFormsModule,
    FormFieldComponent,
    ErrorFieldComponent,
    MatError,
    LoadingComponent,
    MatProgressSpinner,
    OnlyLettersDirective,
    OnlyNumbersDirective,
    RouterOutlet,
  ],
  providers: [ApiHome, AuthRepository],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  private readonly validator = inject(CustomValidatorService);
  private readonly router = inject(Router);
  private readonly authRepository = inject(AuthRepository);
  readonly authStore = inject(AuthStore);
  readonly jwtService = inject(JwtService);

  constructor() {
    effect(
      () => {
        if (this.authStore.isLogged()) {
          if (this.jwtService.authorities().includes(Role.ADMIN)) {
            this.router.navigate(['mantenimiento']);
          } else {
            this.router.navigate(['/']);
          }
        }
      },
      { allowSignalWrites: true },
    );
  }
}
