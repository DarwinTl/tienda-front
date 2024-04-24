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
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';

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

  onSubmit(){
    this.productoService.create2(this.producto, this.file)
      .subscribe(
        (producto) => {
          this.router.navigate(['/productos']),
            Swal.fire('Producto creado', `Producto ${producto.nombre}`, 'success')
        }
      )
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

  public create2(productoForm: NgForm, foto:File): void {
    const newProducto = productoForm.value as  Producto;
    this.productoService.create2(newProducto,foto).subscribe(
      (producto) => {
        this.router.navigate(['/productos']),
          Swal.fire('Producto creado', `Producto ${producto.nombre}`, 'success')
      }
    )
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
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
