import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessagesModule } from 'primeng/messages';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { ActivatedRoute, Router } from '@angular/router';
import { ecommerceService } from '@ecommerce/e-commerce.service';
import {  commentSend, productComment, productXCat, product_List, } from '../inicio/Inicio.type';
import { HttpErrorResponse } from '@angular/common/http';
import { SplitterModule } from 'primeng/splitter';
import { FormsModule, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ShopButtonComponent } from '@components/shop-button/shop-button.component';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Message } from 'primeng/api';
import { JwtPayload } from '@shared/types/jwt.type';
import { jwtDecode } from 'jwt-decode';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [ButtonModule, InputNumberModule, MessagesModule, GalleriaModule, ImageModule, SplitterModule, FormsModule, DividerModule,
    CarouselModule, TagModule, ShopButtonComponent, FieldsetModule, AvatarModule, DialogModule, InputTextareaModule, FloatLabelModule, ReactiveFormsModule],
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.scss'
})
export class ProductoDetalleComponent implements OnInit {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
    this.comentario = new FormGroup({
      comentarioI: new FormControl('', Validators.max(250))
    });
  }
  value1: number = 1;
  recommendedProducts: any[] | undefined;
  images: any[] | undefined;
  responsiveOptions: any[] | undefined;
  products: any
  id: string = '';
  resenas: any[] | undefined;
  comentario: FormGroup
  commentList: productComment[] = []
  commentResponse: productComment | undefined;
  mensajeLogeo: Message | undefined;
  dtoken?: JwtPayload;
  productsM: productXCat[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _ecommerceService: ecommerceService,
    private datePipe: DatePipe
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];

    this.comentario = new FormGroup({
      comentarioI: new FormControl('', Validators.max(250))
    });



  }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id)
      this.getProduct(this.id)
    });




  }


  getProduct(id: string) {
    this._ecommerceService.getProductDetails(id).subscribe({
      next: (res) => {
        this.products = res;
        this.images = [
          {
            itemImageSrc: 'http://localhost:8080/api/mantenimiento/productos/img/' + this.products.ruta,
            thumbnailImageSrc: 'http://localhost:8080/api/mantenimiento/productos/img/' + this.products.ruta,
            alt: 'Description for Image 1',
            title: 'Title 1'
          },
          {
            itemImageSrc: 'http://localhost:8080/api/mantenimiento/productos/img/' + this.products.ruta,
            thumbnailImageSrc: 'http://localhost:8080/api/mantenimiento/productos/img/' + this.products.ruta,
            alt: 'Description for Image 1',
            title: 'Title 1'
          },
          {
            itemImageSrc: 'http://localhost:8080/api/mantenimiento/productos/img/' + this.products.ruta,
            thumbnailImageSrc: 'http://localhost:8080/api/mantenimiento/productos/img/' + this.products.ruta,
            alt: 'Description for Image 1',
            title: 'Title 1'
          },
          {
            itemImageSrc: 'http://localhost:8080/api/mantenimiento/productos/img/' + this.products.ruta,
            thumbnailImageSrc: 'http://localhost:8080/api/mantenimiento/productos/img/' + this.products.ruta,
            alt: 'Description for Image 1',
            title: 'Title 1'
          }, {
            itemImageSrc: 'http://localhost:8080/api/mantenimiento/productos/img/' + this.products.ruta,
            thumbnailImageSrc: 'http://localhost:8080/api/mantenimiento/productos/img/' + this.products.ruta,
            alt: 'Description for Image 1',
            title: 'Title 1'
          }
        ]

        this.getProductXMarca(this.products.marca.id)
        this.getComentarios(this.products.id)
        console.log('este producto:' + this.products);

      },
      error: (e: HttpErrorResponse) => {
        console.log('Error :', e);
        return;
      },
    });
  }

  getProductXMarca(id: number) {
    this._ecommerceService.getProductxMarca(id).subscribe({
      next: (res) => {
        this.productsM = res;

        console.log(this.productsM);
      },
      error: (e: HttpErrorResponse) => {
        console.log('Error :', e);
        return;
      },
    });
  }

  getSeverity(product: productXCat) {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return 'success';
    }
  }
  enviarComentario() {
    var t = localStorage.getItem('token')
    if (!t) {

      this.router.navigate(['/autenticacion/login']);
      return;
    }
    this.dtoken = jwtDecode(t);
    var com = this.comentario.controls['comentarioI'].value
    var cItem: commentSend = { idproducto: this.products.id, correo : this.dtoken.username, comentario: com }
    this._ecommerceService.sendProductComments(cItem).subscribe({
      next: (res) => {
        this.commentResponse = res;

        var fd = this.datePipe.transform(this.commentResponse.fecha, 'yyyy-MM-dd');
        if (fd) {
          this.commentResponse.fecha = fd;
        }

        this.commentList.push(this.commentResponse)

        console.log(this.commentResponse);
      },
      error: (e: HttpErrorResponse) => {
        console.log('Error :', e);
        return;
      },
    });

  }

  getComentarios(id: number) {
    this._ecommerceService.getProductComments(id).subscribe({
      next: (res) => {
        this.commentList = res;

        console.log(this.commentList);
      },
      error: (e: HttpErrorResponse) => {
        console.log('Error :', e);
        return;
      },
    });
  }



}
