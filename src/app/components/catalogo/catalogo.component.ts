import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
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
