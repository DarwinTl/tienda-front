import { Component, OnInit } from '@angular/core';
import { Medida } from './medida';
import { MedidaService } from './medida.service';
// import Swal from 'sweetalert2';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-medidas',
  templateUrl: './medidas.component.html',
  standalone: true,
  imports: [RouterLink],
})
export class MedidasComponent implements OnInit {
  medidas: Medida[] = [];

  constructor(private medidaService: MedidaService) {}

  ngOnInit(): void {
    this.medidaService.getMedidas().subscribe((u) => (this.medidas = u));
  }

  deleteUnidades(medida: Medida): void {
    // Swal.fire({
    //   title: `Estas seguro? la unidad de medida`,
    //   text: "No podras revertir este cambio",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Sí, borrar registro"
    // }).then((result) => {
    //   if (result.isConfirmed) {
    this.medidaService.deleteMedida(medida.id).subscribe(() => {
      this.medidas = this.medidas.filter((m) => m !== medida);
      // Swal.fire({
      //   title: 'Eliminado',
      //   text: `La marca ${medida.descripcion} ha sido eliminada con exito!`,
      //   icon: 'success'
      // });
    });
    //   }
    // }
    // )
  }
}
