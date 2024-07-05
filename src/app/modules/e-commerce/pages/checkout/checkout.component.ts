import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ShopStore } from '@shared/store/shop.store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [MatIcon, TableModule, ButtonModule, CurrencyPipe, CardModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  shopStore = inject(ShopStore);
}
