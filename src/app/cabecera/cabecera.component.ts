import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-cabecera',
    templateUrl: './cabecera.component.html',
    standalone: true,
    imports: [FormsModule]
})
export class CabeceraComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
