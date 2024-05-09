import {
  ReqPostCategoria,
  ReqPutCategoria,
} from '@api/interface/api-categoria.interface';
import { CategoriaField } from '@maintenance/pages/categories/categories-form.component';

export class ApiCategoriaAdapter {
  static postCategoria(data: CategoriaField): ReqPostCategoria {
    return {
      nombre: data.nombre.toUpperCase(),
      detalle: data.detalle.toUpperCase(),
      icono: data.icono,
    };
  }

  static putCategoria(data: Required<CategoriaField>): ReqPutCategoria {
    return {
      id: data.id,
      nombre: data.nombre.toUpperCase(),
      detalle: data.detalle.toUpperCase(),
      icono: data.icono,
    };
  }
}
