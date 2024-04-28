import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../../interfaces/categoria';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html'
})
export class FormCategoriaComponent implements OnInit {

  public categoria: Categoria= new Categoria();

  constructor(private categoriaService:CategoriaService, private router:Router,
    private activaRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCategoria();
  }

  cargarCategoria():void{
    this.activaRoute.params.subscribe((params) =>{
      let id =params['id'];
      if(id){
        this.categoriaService.getCategoria(id).subscribe(categoria =>
          this.categoria =categoria
        )
      }
    })
  }

  public create():void {
    this.categoriaService.create(this.categoria).subscribe(
      (categoria)=>{
        this.router.navigate(['/categorias']),
        Swal.fire('Categoria creada',`Categoria ${categoria.detalle}`, 'success')
      }
    );
  }

  public update():void{
    this.categoriaService.updateCategoria(this.categoria).subscribe(
      (categoria)=>{
        this.router.navigate(['/categorias']),
        Swal.fire(`Categoria actualizada`,`Categoria ${categoria.detalle}`,'success')
      }
    )
  }


}
