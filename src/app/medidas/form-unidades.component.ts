import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Medida } from './medida';
import { MedidaService } from './medida.service';
// import Swal from 'sweetalert2';

import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-form-unidades',
    templateUrl: './form-unidades.component.html',
    standalone: true,
    imports: [FormsModule, RouterLink]
})
export class FormUnidadesComponent implements OnInit {

  public medida!: Medida;


  constructor(private medidaService: MedidaService, private router: Router,
    private activaRoute: ActivatedRoute) { }

   ngOnInit(): void {
    this.cargarMedida()
  }

  cargarMedida(): void {
    this.activaRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.medidaService.getMedida(id).subscribe(medida =>
          this.medida = medida
        )
      }
    })
  }

  public create(): void {
    this.medidaService.create(this.medida).subscribe(
      () => {
        this.router.navigate(['/unidades']);
          // Swal.fire('Unidad de medida creada', `Medida ${medida.descripcion}`, 'success')
      }
    )
  }

  public update(): void {
    this.medidaService.updateMedida(this.medida).subscribe(
      () => {
        this.router.navigate(['/unidades']);
          // Swal.fire(`Unidad de medida actualizada `, `Medida ${medida.descripcion}`, 'success')
      }
    )
  }


}
