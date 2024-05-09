import { Component, OnInit } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { product_List } from './Inicio.type';
import { Router } from '@angular/router';
import { ecommerceService } from '@ecommerce/e-commerce.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    CarouselModule
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
})


export class InicioComponent implements OnInit {
  productos: product_List[] = []
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  constructor(private router: Router, private _ecommerceService: ecommerceService) {

  }

  ngOnInit(): void {
    this.fngetList()
  }

  fngetList() {
    this._ecommerceService.getProducts().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e: HttpErrorResponse) => {
        console.log('Error :', e)
        return
      }
    });
  }
}
