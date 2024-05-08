import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  template: ` <router-outlet></router-outlet> `,
  styles: [],
  imports: [RouterOutlet,CommonModule],
})
export class AppComponent {
  title = 'Market Don Pepe';
}
