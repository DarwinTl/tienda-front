export interface ReqPostAgregarProductoACarrito {
  idProducto: number;
  cantidad: number;
  userId: number;
}

export interface RespAgregarProductoCarrito {
  id: number;
  usuario: Usuario;
  items: Item[];
  estado: null;
  total: number;
}

export interface Item {
  id: number;
  cantidad: number;
  producto: Producto;
  importe: number;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  ruta: string;
  inventoryStatus: string;
  estado: number;
  stock: number;
  precioVenta: number;
  marca: Categoria;
  categoria: Categoria;
  medida: Medida;
}

export interface Categoria {
  id: number;
  nombre: string;
  detalle: string;
  icono: string | null;
}

export interface Medida {
  id: number;
  descripcion: string;
}

export interface Usuario {
  id: number;
  correo: string;
  password: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombres: string;
  numeroDocumento: string;
  estado: boolean;
  roles: Role[];
}

export interface Role {
  id: number;
  nombre: string;
}
