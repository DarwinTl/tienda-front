import { computed } from '@angular/core';
import { Producto } from '@maintenance/pages/products/products.type';
import { signalStore, withComputed, withState } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';

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
);
