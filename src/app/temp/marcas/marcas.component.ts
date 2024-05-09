import { Component, OnInit } from '@angular/core';
import { Marca } from './marca';
import { MarcaService } from './marca.service';
// import Swal from 'sweetalert2';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  standalone: true,
  imports: [RouterLink],
})
export class MarcasComponent implements OnInit {
  marcas: Marca[] = [];

  constructor(private marcaService: MarcaService) {}

  ngOnInit(): void {
    this.marcaService.getMarcas().subscribe((m) => (this.marcas = m));
  }

  deleteCategoria(marca: Marca): void {
    // Swal.fire({
    //   title: `Estas seguro? la marca`,
    //   text: "No podras revertir este cambio",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Sí, borrar registro"
    // }).then((result) => {
    // if (result.isConfirmed) {
    this.marcaService.deleteMarca(marca.id).subscribe(() => {
      this.marcas = this.marcas.filter((c) => c !== marca);
      // Swal.fire({
      //   title: 'Eliminado',
      //   text: `La marca ${marca.detalle} ha sido eliminada con exito!`,
      //   icon: 'success'
      // });
    });
    //   }
    // }
    // )
  }
}
