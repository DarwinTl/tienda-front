import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

import { MatToolbar } from '@angular/material/toolbar';

import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { MainContainerComponent } from '@components/main-container/main-container.component';
import { ecommerceService } from '@ecommerce/e-commerce.service';
import { categoria_product_list } from '@ecommerce/pages/inicio/Inicio.type';

import { AuthStore } from '@shared/store/auth.store';
import { ShopStore } from '@shared/store/shop.store';
import { JwtPayload } from '@shared/types/jwt.type';
import { jwtDecode } from 'jwt-decode';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatBadge,
    MatIcon,
    MatToolbar,
    MatButtonModule,
    MainContainerComponent,
    RouterOutlet,
    RouterLink,
    ButtonModule,
  ],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.scss',
})
export class CabeceraComponent implements OnInit {
  authStore = inject(AuthStore);

  shopStore = inject(ShopStore);
  router = inject(Router);
  dtoken?: JwtPayload;
  loged: boolean = false;

  @Output()
  menuEvent = new EventEmitter<void>();

  @Output()
  shopCartEvent = new EventEmitter<void>();

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.dtoken = jwtDecode(token);
    }
  }
  goInicio() {
    this.router.navigate(['/inicio']);
  }
}
