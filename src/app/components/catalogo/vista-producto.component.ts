import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vista-producto',
  templateUrl: './vista-producto.component.html',
  styleUrls: ['./vista-producto.component.css']
})
export class VistaProductoComponent implements OnInit {

  producto: Producto

  constructor(private productoService:ProductoService, private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarProducto();
  }

  cargarProducto(): void {
    this.activateRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.productoService.getProducto(id).subscribe(producto =>
          this.producto = producto
        )
      }
    })
  }

}
