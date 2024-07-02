import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

import { MatToolbar } from '@angular/material/toolbar';
import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { searchBox, hits, configure } from 'instantsearch.js/es/widgets';
import { getPropertyByPath } from 'instantsearch.js/es/lib/utils';
import {
  Router,
  RouterLink,
  RouterOutlet,
  NavigationExtras,
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
  private searchClient = algoliasearch(
    'USB9WPOAW1',
    '01efa4d59258f2abe0c113eacf1d442a',
  );
  public search: any;
  public isFirstSearch: boolean = true;
  public isCustomSearchVisible: boolean = true;

  shopStore = inject(ShopStore);
  router = inject(Router);
  dtoken?: JwtPayload;
  loged: boolean = false;

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @Output()
  menuEvent = new EventEmitter<void>();

  @Output()
  shopCartEvent = new EventEmitter<void>();

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.dtoken = jwtDecode(token);
    }

    this.search = this.searchClient.initIndex('aea');
  }
  goInicio() {
    this.router.navigate(['/inicio']);
  }

  searchAlgolia(): void {
    const query = this.searchInput.nativeElement.value.trim();

    if (query.length > 0) {
      this.search
        .search(query)
        .then((response: any) => {
          console.log('Resultados de la búsqueda:', response.hits);

          // Limpiar resultados anteriores
          const resultsList = document.getElementById('resultsList');

          resultsList!.innerHTML = '';
          if (resultsList!.style.display == 'none') {
            resultsList!.style.display = 'block';
          }
          // Mostrar nuevos resultados
          response.hits.forEach((hit: any) => {
            const listItem = document.createElement('li');
            listItem.classList.add('result-item');
            listItem.style.cursor = 'pointer'; // Agrega una clase para aplicar estilos
            listItem.style.display = 'flex';
            listItem.style.alignItems = 'center';
            listItem.style.justifyContent = 'flex-start';
            listItem.style.padding = '10px';
            listItem.style.transition = 'background-color 0.3s ease';

            // Crear imagen
            const imageElement = document.createElement('img');
            imageElement.src = hit.url; // Reemplaza con la URL del campo de imagen
            imageElement.alt = hit.nombre; // Reemplaza con el campo que contiene la descripción de la imagen
            imageElement.style.width = '100px';
            // Establecer ancho de la imagen

            // Crear título
            const titleElement = document.createElement('span');
            titleElement.textContent = hit.nombre; // Reemplaza con el campo que contiene el título
            titleElement.style.width = '100px';
            titleElement.style.marginLeft = '20px';

            listItem.addEventListener('click', () => {
              this.router.navigate(['/producto-detalle', { id: hit.id }]);
              resultsList!.style.display = 'none';
              this.searchInput.nativeElement.value = '';
              // console.log('Resultado clickeado:', hit);
            });

            // Agregar elementos al listItem
            listItem.appendChild(imageElement);
            listItem.appendChild(titleElement);

            // Agregar listItem a resultsList
            resultsList!.appendChild(listItem);
          });
        })
        .catch((error: any) => {
          console.error('Error al realizar la búsqueda:', error);
        });
    }
  }
}
