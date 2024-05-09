import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav'; // For compatibility with older Angular Material versions
import { MainContainerComponent } from '@components/main-container/main-container.component';
import { CabeceraComponent } from '../../shared/components/cabecera/cabecera.component';

@Component({
  selector: 'app-layout',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  template: ` <app-cabecera></app-cabecera>`,
  imports: [
    MatMenuModule,
    MatListModule,
    MatDrawer,
    MatDrawerContainer,
    MatBadgeModule,
    MatIconModule,
    MatDrawerContent,
    RouterOutlet,
    MatToolbar,
    MatButtonModule,
    MatFormFieldModule,
    MainContainerComponent,
    RouterLink,
    RouterLinkActive,
    CabeceraComponent,
  ],
})
export class LayoutComponent {
  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }
}
