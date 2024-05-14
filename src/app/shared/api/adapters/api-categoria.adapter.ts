import {
  ReqPostCategoria,
  ReqPutCategoria,
} from '@api/interface/api-categoria.interface';
import { CategoriaField } from '@maintenance/pages/categories/categories-form.component';

export class ApiCategoriaAdapter {
  static postCategoria(data: CategoriaField): ReqPostCategoria {
    return {
<<<<<<< HEAD
      nombre: data.nombre.toUpperCase(),
      detalle: data.detalle.toUpperCase(),
=======
      nombre: data.nombre,
      detalle: data.detalle,
>>>>>>> origin/develop
      icono: data.icono,
    };
  }

  static putCategoria(data: Required<CategoriaField>): ReqPutCategoria {
    return {
      id: data.id,
<<<<<<< HEAD
      nombre: data.nombre.toUpperCase(),
      detalle: data.detalle.toUpperCase(),
=======
      nombre: data.nombre,
      detalle: data.detalle,
>>>>>>> origin/develop
      icono: data.icono,
    };
  }
}
