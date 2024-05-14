export type product_List = {
  id?: number;
  nombre: string;
  descripcion: string;
  ruta: 'bamboo-watch.jpg';
  estado: number;
  stock: number;
  precioVenta: number;
  marca: marca_product_list;
  categoria: categoria_product_list;
  medida: medida_product_list;
  inventoryStatus?: string;
  rating: number

};

export type marca_product_list = {
  id: number;
  nombre: string;
  detalle: string;
};

export type categoria_product_list = {
  id: number;
  nombre: string;
  detalle: string;
  icono: string;
};

export type medida_product_list = {
  id: number;
  descripcion: string;
};
