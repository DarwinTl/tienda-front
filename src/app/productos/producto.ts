import { Categoria } from '../categorias/categoria';
import { Marca } from '../marcas/marca';
import { Medida } from '../medidas/medida';

export class Producto {
  id: number;
  nombre: string;
  descripcion: string;
  ruta: string;
  estado: number;
  marca: Marca;
  categoria: Categoria;
  medida: Medida;
}
