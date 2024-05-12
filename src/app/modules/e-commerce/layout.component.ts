import { Component } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatList } from '@angular/material/list';
import { MatMenu } from '@angular/material/menu';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav'; // For compatibility with older Angular Material versions
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MainContainerComponent } from '@components/main-container/main-container.component';
import { CabeceraComponent } from '../../shared/components/cabecera/cabecera.component';

@Component({
  selector: 'app-layout',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  template: ` <app-cabecera></app-cabecera>`,
  imports: [
    MatMenu,
    MatList,
    MatDrawer,
    MatDrawerContainer,
    MatBadge,
    MatIcon,
    MatDrawerContent,
    RouterOutlet,
    MatToolbar,
    MatButton,
    MatFormField,
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
