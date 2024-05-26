import { computed } from '@angular/core';
import { Producto } from '@maintenance/pages/products/products.type';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { removeEntity, setEntity, withEntities } from '@ngrx/signals/entities';

export type ProductoCart = Producto & {
  cantidad: number;
  total: number;
  isLoading: boolean;
};

export const ShopStore = signalStore(
  { providedIn: 'root' },
  withState({ ids: [] }),
  withEntities<ProductoCart>(),
  withComputed(({ entities }) => ({
    totalCompra: computed(() => {
      return entities().reduce((acc, { total }) => acc + total, 0);
    }),
  })),
  withMethods((store) => {
    return {
      add(producto: ProductoCart) {
        patchState(store, setEntity(producto));
      },
      remove(producto: ProductoCart) {
        patchState(store, removeEntity(producto.id));
      },
    };
  }),
);
