import { inject } from '@angular/core';
import { ecommerceService } from '@ecommerce/e-commerce.service';
import { MenuCategoria } from '@ecommerce/pages/inicio/Inicio.type';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ApiError } from '@shared/models/error.model';
import { pipe, switchMap } from 'rxjs';

type MenuState = {
  loading: boolean;
  categorias: MenuCategoria[];
};

const inistialState: MenuState = {
  loading: false,
  categorias: [],
};

export const MenuStore = signalStore(
  { providedIn: 'root' },
  withState(inistialState),
  withMethods((store, api = inject(ecommerceService)) => ({
    loadMenu: rxMethod<void>(
      pipe(
        switchMap(() =>
          api.getCategories().pipe(
            tapResponse({
              next: (menu) => {
                patchState(store, {
                  categorias: menu.map((categoria) => ({
                    ...categoria,
                    ruta: categoria.nombre
                      .trim()
                      .replace(/\s+/g, '-')
                      .toLowerCase(),
                  })),
                });
              },
              error: (error: ApiError) => {
                console.log({ error });
              },
            }),
          ),
        ),
      ),
    ),
    getIdMenu: (rutaParam: string) => {
      const categoria = store
        .categorias()
        .find(({ ruta }) => ruta === rutaParam);
      if (categoria) {
        return categoria;
      }
      return null;
    },
  })),
);
