import { computed, inject } from '@angular/core';
import { ReqPostAgregarProductoACarrito } from '@api/interface/api-home.interface';
import { ApiHome } from '@api/service/api-home';
import { Producto } from '@maintenance/pages/products/products.type';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  removeAllEntities,
  removeEntity,
  setEntity,
  withEntities,
} from '@ngrx/signals/entities';

export type ProductoCart = Producto & {
  cantidad: number;
  total: number;
  isLoading: boolean;
  idCarrito: number;
};

export const ShopStore = signalStore(
  { providedIn: 'root' },
  withState({ ids: [] }),
  withEntities<ProductoCart>(),
  withComputed(({ entities }) => ({
    totalCompra: computed(() => {
      return entities().reduce((acc, { total }) => acc + total, 0);
    }),
    productoPorId: computed(() => {
      return (id: number) => entities().find((producto) => producto.id === id);
    }),
  })),
  withMethods((store, apiHome = inject(ApiHome)) => {
    return {
      async add(producto: ProductoCart) {
        const payload: ReqPostAgregarProductoACarrito = {
          idProducto: producto.id,
          cantidad: 1,
          userId: 7,
        };
        const result = await apiHome
          .agregarProductoACarrito(payload)
          .toPromise();
        const productoResult = result?.items.find(
          ({ producto }) => producto.id === producto.id,
        );
        if (productoResult) {
          patchState(
            store,
            setEntity({ ...producto, idCarrito: productoResult.id }),
          );
        }
      },
      async subtract(producto: ProductoCart) {
        const payload: ReqPostAgregarProductoACarrito = {
          idProducto: producto.id,
          cantidad: -1,
          userId: 7,
        };
        const result = await apiHome
          .agregarProductoACarrito(payload)
          .toPromise();
        const productoResult = result?.items.find(
          ({ producto }) => producto.id === producto.id,
        );
        if (productoResult) {
          patchState(
            store,
            setEntity({ ...producto, idCarrito: productoResult.id }),
          );
        }
      },
      async remove(producto: ProductoCart) {
        const idProducto = store.productoPorId()(producto.id);
        if (idProducto) {
          const payload = {
            idProducto: idProducto.idCarrito,
            userId: 7,
          };

          await apiHome.removerProductoDeCarrito(payload).toPromise();
          patchState(store, removeEntity(producto.id));
        }
      },
      async obtenerCarrito() {
        const result = await apiHome.obtenerCarrito(7).toPromise();
        result?.items.forEach((producto) => {
          patchState(store, setEntity(producto));
        });
      },
      limpiarCarrito() {
        patchState(store, removeAllEntities());
      },
      productoPorId(id: number) {
        return store.entities().find((producto) => producto.id === id);
      },
    };
  }),
);
