import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Producto } from '../productos/producto';
import { ProductoService } from '../productos/producto.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class CatalogoComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((p) => (this.productos = p));
  }
}
