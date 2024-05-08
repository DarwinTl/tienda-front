import { Component, OnInit } from '@angular/core';
import { Producto } from './producto';
import { ProductoService } from './producto.service';
// import Swal from 'sweetalert2';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  standalone: true,
  imports: [RouterLink],
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((p) => (this.productos = p));
  }

  deleteProducto(producto: Producto): void {
    // Swal.fire({
    //   title: `Estas seguro? el producto`,
    //   text: "No podras revertir este cambio",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Sí, borrar registro"
    // }).then((result) => {
    // if (result.isConfirmed) {
    this.productoService.deleteProducto(producto.id).subscribe(() => {
      this.productos = this.productos.filter((p) => p !== producto);
      // Swal.fire({
      //   title: 'Eliminado',
      //   text: `El producto ${producto.nombre} ha sido eliminado con exito!`,
      //   icon: 'success'
      // });
    });
    //   }
    // }
    // )
  }
}
