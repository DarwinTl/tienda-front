import { Producto } from '@maintenance/pages/products/products.type';
import { signalStore, withState } from '@ngrx/signals';
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
);
