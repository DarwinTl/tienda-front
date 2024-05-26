import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
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

import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

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
    ButtonModule,
  ],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.scss',
})
export class CabeceraComponent implements OnInit {
  authStore = inject(AuthStore);
  shopStore = inject(ShopStore);
  categorias: categoria_product_list[] = [];
  dtoken?: JwtPayload;
  loged: boolean = false;

  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _ecommerceService: ecommerceService,
  ) {
    this.route.params.subscribe((params) => {
      const parametro = params['parametro'];
      console.log(parametro);
    });
  }

  ngOnInit(): void {
    this.fngeCatList();
    const token = localStorage.getItem('token');
    console.log('token:', token);
    if (token) {
      this.dtoken = jwtDecode(token);
    }
  }

  fngeCatList() {
    this._ecommerceService.getCategories().subscribe({
      next: (res) => {
        this.categorias = res;

        console.log(this.categorias);
      },
      error: (e: HttpErrorResponse) => {
        console.log('Error :', e);
      },
    });
  }

  goInicio() {
    this.router.navigate(['/inicio']);
  }
}
