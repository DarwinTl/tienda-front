import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStore } from '@shared/store/auth.store';

@Component({
  selector: 'app-root',
  standalone: true,
  template: ` <router-outlet></router-outlet> `,
  styles: [],
  imports: [RouterOutlet],
})
export class AppComponent {
  readonly authStore = inject(AuthStore);
  constructor() {
    this.authStore.findCookie();
  }
}
