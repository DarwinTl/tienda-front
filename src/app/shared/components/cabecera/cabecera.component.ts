import { Component } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MainContainerComponent } from '@components/main-container/main-container.component';

@Component({
  selector: 'app-cabecera',
  standalone: true,
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
    RouterOutlet,
  ],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.scss',
})
export class CabeceraComponent {
  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }
}
