import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiHome } from '@api/service/api-home';
import { LoadingComponent } from '@components/loading/loading.component';
import { Role } from '@shared/enums/role.enum';
import { JwtService } from '@shared/services/jwt.service';
import { AuthStore } from '@shared/store/auth.store';
import { AuthRepository } from './repositories/auth-repository';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    MatIcon,
    RouterLink,
    LoadingComponent,
    RouterOutlet,
  ],
  providers: [ApiHome, AuthRepository],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  private readonly router = inject(Router);
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
