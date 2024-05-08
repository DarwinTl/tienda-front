import { Categoria } from "../categories/categories.type";
import { Marca } from "../marcas/marcas.type";

export type DataTableProducts = {
    id: number;
    nombre: string;
    descripcion: string;
};
  
export type Producto = {
    id: number;
    categoria: Categoria;
    descripcion: string;
    estado: number;
    marca: Marca;
    nombre: string;
    precioVenta: number;
    ruta: string;
    stock: number;
}