import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-root',
  standalone: true,
  template: ` <router-outlet></router-outlet> `,
  styles: [],
  imports: [RouterOutlet, CommonModule, CarouselModule],
})
export class AppComponent {
  title = 'Market Don Pepe';
}
