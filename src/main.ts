import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { VistaProductoComponent } from './app/catalogo/vista-producto.component';
import { FormProductoComponent } from './app/productos/form-producto.component';
import { ProductosComponent } from './app/productos/productos.component';
import { FormUnidadesComponent } from './app/medidas/form-unidades.component';
import { MedidasComponent } from './app/medidas/medidas.component';
import { FormMarcasComponent } from './app/marcas/form-marcas.component';
import { MarcasComponent } from './app/marcas/marcas.component';
import { FormCategoriaComponent } from './app/categorias/form-categoria.component';
import { CategoriasComponent } from './app/categorias/categorias.component';
import { CatalogoComponent } from './app/catalogo/catalogo.component';
import { provideRouter, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

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



if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes)
    ]
})
  .catch(err => console.error(err));
