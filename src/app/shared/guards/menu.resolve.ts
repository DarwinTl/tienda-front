import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ecommerceService } from '@ecommerce/e-commerce.service';
import { MenuCategoria } from '@ecommerce/pages/inicio/Inicio.type';
import { patchState } from '@ngrx/signals';
import { MenuStore } from '@shared/store/menu.store';
import { map, tap } from 'rxjs';

export const menuResolve: ResolveFn<MenuCategoria[]> = () => {
  const menuStore = inject(MenuStore);
  const api = inject(ecommerceService);
  return api.getCategories().pipe(
    map((menus) =>
      menus.map((categoria) => ({
        ...categoria,
        ruta: categoria.nombre.trim().replace(/\s+/g, '-').toLowerCase(),
      })),
    ),
    tap((menu) => {
      patchState(menuStore, { categorias: menu });
    }),
  );
};
