import { Component, OnInit } from '@angular/core';
import { ProductoService } from './producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from './producto';
import Swal from 'sweetalert2';
import { Categoria } from '../categorias/categoria';
import { CategoriaService } from '../categorias/categoria.service';
import { Marca } from '../marcas/marca';
import { Medida } from '../medidas/medida';
import { MarcaService } from '../marcas/marca.service';
import { MedidaService } from '../medidas/medida.service';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html'
})
export class FormProductoComponent implements OnInit {

  public producto: Producto = new Producto();
  categorias: Categoria[];
  marcas: Marca[];
  medidas: Medida[];

  file:File;

  constructor(private productoService: ProductoService, private router: Router,
    private activaRoute: ActivatedRoute, private categoriaService: CategoriaService,
    private marcaService: MarcaService, private medidasService: MedidaService) { }

  ngOnInit(): void {
    this.cargarProducto();
    this.categoriaService.getCategorias().subscribe(categoria =>
      this.categorias = categoria
    );
    this.marcaService.getMarcas().subscribe(marcas =>
      this.marcas = marcas
    );
    this.medidasService.getMedidas().subscribe(med =>
      this.medidas = med
    );
  }

  cargarProducto(): void {
    this.activaRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.productoService.getProducto(id).subscribe(producto =>
          this.producto = producto
        )
      }
    })
  }

  public create(): void {
    this.productoService.create(this.producto).subscribe(
      (producto) => {
        this.router.navigate(['/productos']),
          Swal.fire('Producto creado', `Producto ${producto.nombre}`, 'success')
      }
    )
  }

  public create2(): void {
    const formData = new FormData();

    formData.append('file',this.file);
    formData.append('nombre',this.producto.nombre)
    formData.append('marca',this.producto.marca.nombre)
    formData.append('categoria',this.producto.categoria.detalle)
    this.productoService.create2(formData).subscribe(
      (producto) => {
        this.router.navigate(['/productos']),
          Swal.fire('Producto creado', `Producto ${producto.nombre}`, 'success')
      }
    )
  }

  public update(): void {
    this.productoService.updateProducto(this.producto).subscribe(
      (producto) => {
        this.router.navigate(['/productos']),
          Swal.fire(`Producto actualizado `, `Medida ${producto.nombre}`, 'success')
      }
    )
  }

  comparar(c1: any, c2: any): boolean {
    return c1 == null || c2 == null ? false : c1.id === c2.id;
  }


}
