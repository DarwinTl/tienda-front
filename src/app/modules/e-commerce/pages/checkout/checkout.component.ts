import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ApiOrden } from '@api/service/api-orden';
import { JwtService } from '@shared/services/jwt.service';
import { ShopStore } from '@shared/store/shop.store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [MatIcon, TableModule, ButtonModule, CurrencyPipe, CardModule, DialogModule, LoadingComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  shopStore = inject(ShopStore);
  apiOrden = inject(ApiOrden);
  jwt = inject(JwtService);
  router = inject(Router);

  visible = signal(false);
  isLoading = signal(false);
  comprar() {
    this.isLoading.set(true);
    this.apiOrden.ingresarCompra(this.jwt.userId()).pipe(finalize(() => this.isLoading.set(false))).subscribe({
      next: value => {
        console.log({value});
        this.shopStore.limpiarCarrito();
        this.visible.set(true);
      }
    });
  }
  
  navigateHome() {
    this.router.navigate(['/']);
  }
}
