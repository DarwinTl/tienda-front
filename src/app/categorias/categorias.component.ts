import { Component, OnInit } from '@angular/core';
import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';
import Swal from 'sweetalert2';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-categorias',
    templateUrl: './categorias.component.html',
    standalone: true,
    imports: [RouterLink, NgFor]
})
export class CategoriasComponent implements OnInit {

  categorias: Categoria[];

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe(
      c => this.categorias = c
    );
  }

  deleteCategoria(categoria: Categoria): void {
    Swal.fire({
      title: `Estas seguro? la categoria`,
      text: "No podras revertir este cambio",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar registro"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.deleteCategoria(categoria.id).subscribe(
          (response) => {
            this.categorias = this.categorias.filter(c => c !== categoria),
              Swal.fire({
                title: 'Eliminado',
                text: `La categoria ${categoria.detalle} ha sido eliminada con exito!`,
                icon: 'success'
              });
          }
        )
      }
    }
    )
  }



}
