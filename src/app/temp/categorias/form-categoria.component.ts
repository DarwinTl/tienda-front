import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';
// import Swal from 'sweetalert2';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  standalone: true,
  imports: [FormsModule, RouterLink],
})
export class FormCategoriaComponent implements OnInit {
  public categoria!: Categoria;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private activaRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.cargarCategoria();
  }

  cargarCategoria(): void {
    this.activaRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.categoriaService
          .getCategoria(id)
          .subscribe((categoria) => (this.categoria = categoria));
      }
    });
  }

  public create(): void {
    this.categoriaService.create(this.categoria).subscribe(() => {
      this.router.navigate(['/categorias']);
      // Swal.fire('Categoria creada',`Categoria ${categoria.detalle}`, 'success')
    });
  }

  public update(): void {
    this.categoriaService.updateCategoria(this.categoria).subscribe(() => {
      this.router.navigate(['/categorias']);
      // Swal.fire(`Categoria actualizada`,`Categoria ${categoria.detalle}`,'success')
    });
  }
}
