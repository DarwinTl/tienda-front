import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CabeceraComponent } from '@components/cabecera/cabecera.component';

@Component({
  selector: 'app-cuerpo',
  standalone: true,
  imports: [CabeceraComponent],
  templateUrl: './cuerpo.component.html',
  styleUrl: './cuerpo.component.scss'
})
export class CuerpoComponent implements OnInit {
parametro : string = ''

constructor(private route: ActivatedRoute) { }

ngOnInit(): void {
  
  this.route.params.subscribe(params => {
    this.parametro = params['parametro'];
  
  });
}


}
