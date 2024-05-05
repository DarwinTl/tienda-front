import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Marca } from './marca';
import { MarcaService } from './marca.service';
// import Swal from 'sweetalert2';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-marcas',
  templateUrl: './form-marcas.component.html',
  standalone: true,
  imports: [FormsModule, RouterLink],
})
export class FormMarcasComponent implements OnInit {
  public marca!: Marca;

  constructor(
    private marcaService: MarcaService,
    private router: Router,
    private activaRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.cargarMarca();
  }

  cargarMarca(): void {
    this.activaRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.marcaService
          .getMarca(id)
          .subscribe((marca) => (this.marca = marca));
      }
    });
  }

  public create(): void {
    this.marcaService.create(this.marca).subscribe(() => {
      this.router.navigate(['/marcas']);
      // Swal.fire('Marca creada', `Marca ${marca.nombre}`, 'success')
    });
  }

  public update(): void {
    this.marcaService.updateMarca(this.marca).subscribe(() => {
      this.router.navigate(['/marcas']);
      // Swal.fire(`Marca actualizada `, `Marca ${marca.nombre}`, 'success')
    });
  }
}
