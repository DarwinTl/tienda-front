import { Component, OnInit } from '@angular/core';
import { Medida } from './medida';
import { MedidaService } from './medida.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-unidades',
  templateUrl: './form-unidades.component.html'
})
export class FormUnidadesComponent implements OnInit {

  public medida:Medida= new Medida();


  constructor(private medidaService: MedidaService, private router: Router,
    private activaRoute: ActivatedRoute) { }

   ngOnInit(): void {
    this.cargarMedida()
  }

  cargarMedida(): void {
    this.activaRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.medidaService.getMedida(id).subscribe(medida =>
          this.medida = medida
        )
      }
    })
  }

  public create(): void {
    this.medidaService.create(this.medida).subscribe(
      (medida) => {
        this.router.navigate(['/unidades']),
          Swal.fire('Unidad de medida creada', `Medida ${medida.descripcion}`, 'success')
      }
    )
  }

  public update(): void {
    this.medidaService.updateMedida(this.medida).subscribe(
      (medida) => {
        this.router.navigate(['/unidades']),
          Swal.fire(`Unidad de medida actualizada `, `Medida ${medida.descripcion}`, 'success')
      }
    )
  }


}
