import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< HEAD
import { CarouselModule } from 'ngx-owl-carousel-o';
=======
import { AuthStore } from '@shared/store/auth.store';
>>>>>>> b08c0355e108ad5c1f871af420920ae068cc3140

@Component({
  selector: 'app-root',
  standalone: true,
  template: ` <router-outlet></router-outlet> `,
  styles: [],
<<<<<<< HEAD
  imports: [RouterOutlet, CommonModule, CarouselModule],
=======
  imports: [RouterOutlet],
>>>>>>> b08c0355e108ad5c1f871af420920ae068cc3140
})
export class AppComponent {
  readonly authStore = inject(AuthStore);
  constructor() {
    this.authStore.findCookie();
  }
}
