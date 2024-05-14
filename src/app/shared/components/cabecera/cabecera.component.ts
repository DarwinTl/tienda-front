import { HttpErrorResponse } from '@angular/common/http';
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
<<<<<<< HEAD
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
=======
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
>>>>>>> origin/develop
import { MainContainerComponent } from '@components/main-container/main-container.component';
import { ecommerceService } from '@ecommerce/e-commerce.service';
import { categoria_product_list } from '@ecommerce/pages/inicio/Inicio.type';
import { ActivatedRoute } from '@angular/router';
<<<<<<< HEAD
import { ButtonModule } from 'primeng/button';
=======
>>>>>>> origin/develop
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
<<<<<<< HEAD
    ButtonModule,
=======

>>>>>>> origin/develop
  ],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.scss',
})
export class CabeceraComponent {
<<<<<<< HEAD
  categorias: categoria_product_list[] = [];
=======

  categorias: categoria_product_list[] = []
>>>>>>> origin/develop

  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
    
  }

<<<<<<< HEAD
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _ecommerceService: ecommerceService,
  ) {
    this.route.params.subscribe((params) => {
      const parametro = params['parametro'];
      console.log(parametro);
=======

  constructor(private router: Router,private route: ActivatedRoute, private _ecommerceService: ecommerceService) {
    this.route.params.subscribe(params => {
      const parametro = params['parametro'];
      console.log(parametro)
>>>>>>> origin/develop
    });
  }

  ngOnInit(): void {
<<<<<<< HEAD
    this.fngeCatList();
=======
    this.fngeCatList()
>>>>>>> origin/develop
  }

  fngeCatList() {
    this._ecommerceService.getCategories().subscribe({
      next: (res) => {
<<<<<<< HEAD
        this.categorias = res;

        console.log(this.categorias);
      },
      error: (e: HttpErrorResponse) => {
        console.log('Error :', e);
        return;
      },
    });
  }

  goInicio() {
    this.router.navigate(['/inicio']);
  }
=======

        this.categorias = res;

        console.log(this.categorias)
      },
      error: (e: HttpErrorResponse) => {
        console.log('Error :', e)
        return
      }
    });
  }







  
>>>>>>> origin/develop
}
