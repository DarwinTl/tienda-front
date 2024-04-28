import { NgModule } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { RouterModule, Routes } from '@angular/router';
import { FormCategoriaComponent } from './components/categorias/form-categoria.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarcasComponent } from './components/marcas/marcas.component';
import { FormMarcasComponent } from './components/marcas/form-marcas.component';
import { MedidasComponent } from './components/medidas/medidas.component';
import { FormUnidadesComponent } from './components/medidas/form-unidades.component';
import { ProductosComponent } from './components/productos/productos.component';
import { FormProductoComponent } from './components/productos/form-producto.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { VistaProductoComponent } from './components/catalogo/vista-producto.component';
import { LoginComponent } from './components/login/login.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { addTokenInterceptor } from './services/add-token.interceptor';


const routes: Routes = [
  { path: '', redirectTo: '/catalogo', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, },
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
    VistaProductoComponent,
    LoginComponent,
    
 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NgSelectModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:addTokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
