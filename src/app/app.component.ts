import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStore } from '@shared/store/auth.store';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  template: ` <p-toast /> <router-outlet></router-outlet> `,
  imports: [RouterOutlet, ToastModule],
})
export class AppComponent {
  readonly authStore = inject(AuthStore);
  constructor() {
    this.authStore.findCookie();
  }
}
