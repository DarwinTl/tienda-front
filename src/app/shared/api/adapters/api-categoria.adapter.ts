import {
  ReqPostCategoria,
  ReqPutCategoria,
} from '@api/interface/api-categoria.interface';
import { CategoriaField } from '@maintenance/pages/categories/form-categories.component';

export class ApiCategoriaAdapter {
  static postCategoria(data: CategoriaField): ReqPostCategoria {
    return {
      detalle: data.nombre.toUpperCase(),
    };
  }

  static putCategoria(data: Required<CategoriaField>): ReqPutCategoria {
    return {
      id: data.id,
      detalle: data.nombre.toUpperCase(),
    };
  }
}
