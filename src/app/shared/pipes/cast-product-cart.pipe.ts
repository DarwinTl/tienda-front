import { Pipe, PipeTransform } from '@angular/core';
import { productXCat } from '@ecommerce/pages/inicio/Inicio.type';
import { ProductoCart } from '@shared/store/shop.store';

@Pipe({
  name: 'castProductCart',
  standalone: true,
})
export class CastProductCartPipe implements PipeTransform {
  transform(value: productXCat): ProductoCart {
    console.log({ value });

    return {
      ...value,
      cantidad: 1,
      isLoading: false,
      total: 0,
      idCarrito: 0,
    };
  }
}
