export type DataTableCategories = Required<Categoria>;

export type Categoria = {
  id: number;
  nombre: string;
  detalle: string | null;
  icono: string | null;
};
