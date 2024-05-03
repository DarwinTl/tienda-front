import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../productos/producto.service';
import { Producto } from '../productos/producto';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-catalogo',
    templateUrl: './catalogo.component.html',
    styleUrls: ['./catalogo.component.css'],
    standalone: true,
    imports: [RouterLink]
})
export class CatalogoComponent implements OnInit {

  productos: Producto[];

  constructor(private productoService:ProductoService) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(p =>
      this.productos = p
    )
  }

  

}
