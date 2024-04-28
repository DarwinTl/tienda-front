import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../../services/marca.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Marca } from '../../interfaces/marca';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-marcas',
  templateUrl: './form-marcas.component.html'
})
export class FormMarcasComponent implements OnInit {

  public marca: Marca = new Marca()

  constructor(private marcaService: MarcaService, private router: Router,
    private activaRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarMarca()
  }

  cargarMarca(): void {
    this.activaRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.marcaService.getMarca(id).subscribe(marca =>
          this.marca = marca
        )
      }
    })
  }

  public create(): void {
    this.marcaService.create(this.marca).subscribe(
      (marca) => {
        this.router.navigate(['/marcas']),
          Swal.fire('Marca creada', `Marca ${marca.nombre}`, 'success')
      }
    )
  }

  public update(): void {
    this.marcaService.updateMarca(this.marca).subscribe(
      (marca) => {
        this.router.navigate(['/marcas']),
          Swal.fire(`Marca actualizada `, `Marca ${marca.nombre}`, 'success')
      }
    )
  }


}
