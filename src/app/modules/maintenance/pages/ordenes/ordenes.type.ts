export interface DataTableOrdenes {
  id:            number;
  fechaVenta:    Date;
  estado:        string;
  horaVenta:     string;
  numeroBoleta:  string;
  subTotal:      number;
  igv:           number;
  descuento:     number;
  total:         number;
  tipoVenta:     number;
  tipoDocumento: number;
  detalles:      Detalle[];
  usuario:       Usuario;
}

export interface Detalle {
  id:       number;
  producto: Producto;
  cantidad: number;
  importe:  number;
}

export interface Producto {
  id:              number;
  nombre:          string;
  descripcion:     string;
  ruta:            string;
  inventoryStatus: string;
  estado:          number;
  stock:           number;
  precioVenta:     number;
  marca:           Categoria;
  categoria:       Categoria;
  medida:          Medida;
  comentarios:     string[];
}

export interface Categoria {
  id:      number;
  nombre:  string;
  detalle: string;
  icono?:  string;
}

export interface Medida {
  id:          number;
  descripcion: string;
}

export interface Usuario {
  id:              number;
  correo:          string;
  password:        string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombres:         string;
  numeroDocumento: string;
  estado:          boolean;
  roles:           Role[];
}

export interface Role {
  id:     number;
  nombre: string;
}
