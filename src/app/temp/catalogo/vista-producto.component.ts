import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../productos/producto';
import { ProductoService } from '../productos/producto.service';

@Component({
  selector: 'app-vista-producto',
  templateUrl: './vista-producto.component.html',
  styleUrls: ['./vista-producto.component.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class VistaProductoComponent implements OnInit {
  producto!: Producto;

  constructor(
    private productoService: ProductoService,
    private activateRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.cargarProducto();
  }

  cargarProducto(): void {
    this.activateRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.productoService
          .getProducto(id)
          .subscribe((producto) => (this.producto = producto));
      }
    });
  }
}
