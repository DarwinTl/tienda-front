import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabeceraComponent } from './cabecera/cabecera.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [CabeceraComponent, RouterOutlet]
})
export class AppComponent {
  title = 'tienda-front';
}
