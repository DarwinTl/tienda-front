import { Categoria } from './categoria';
import { Marca } from './marca';
import { Medida } from './medida';

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
