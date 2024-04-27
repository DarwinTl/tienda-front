import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { RouterModule, Routes } from '@angular/router';
import { FormCategoriaComponent } from './categorias/form-categoria.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MarcasComponent } from './marcas/marcas.component';
import { FormMarcasComponent } from './marcas/form-marcas.component';
import { MedidasComponent } from './medidas/medidas.component';
import { FormUnidadesComponent } from './medidas/form-unidades.component';
import { ProductosComponent } from './productos/productos.component';
import { FormProductoComponent } from './productos/form-producto.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { VistaProductoComponent } from './catalogo/vista-producto.component';



const routes: Routes = [
  { path: '', redirectTo: '/catalogo', pathMatch: 'full' },
  { path: 'catalogo', component: CatalogoComponent, },
  { path: 'categorias', component: CategoriasComponent, },
  { path: 'categorias-form', component: FormCategoriaComponent, },
  { path: 'categorias-form/:id', component: FormCategoriaComponent, },
  { path: 'marcas', component: MarcasComponent, },
  { path: 'marcas-form', component: FormMarcasComponent, },
  { path: 'marcas-form/:id', component: FormMarcasComponent, },
  { path: 'unidades', component: MedidasComponent, },
  { path: 'unidades-form', component: FormUnidadesComponent, },
  { path: 'unidades-form/:id', component: FormUnidadesComponent, },
  { path: 'productos', component: ProductosComponent, },
  { path: 'productos-form', component: FormProductoComponent, },
  { path: 'productos-form/:id', component: FormProductoComponent, },
  { path: 'productos-detalles/:id', component: VistaProductoComponent, },
]



@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    CategoriasComponent,
    FormCategoriaComponent,
    MarcasComponent,
    FormMarcasComponent,
    MedidasComponent,
    FormUnidadesComponent,
    ProductosComponent,
    FormProductoComponent,
    CatalogoComponent,
    VistaProductoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
