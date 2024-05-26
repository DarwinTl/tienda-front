import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { patchState } from '@ngrx/signals';
import { addEntities, removeEntity, setEntities } from '@ngrx/signals/entities';
import { OnlyNumbersDirective } from '@shared/directives/only-numbers.directive';
import { ProductoCart, ShopStore } from '@shared/store/shop.store';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-shop-button',
  standalone: true,
  imports: [
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    OnlyNumbersDirective,
  ],
  template: `
    <div class="tw-w-full tw-flex tw-min-w-48">
      <div class="tw-flex tw-flex-auto">
        @if (!isAddedShoppingCart()) {
          <p-button
            (click)="addShoppingCart()"
            type="button"
            [icon]="
              isLoading() ? 'pi pi-spin pi-spinner' : 'pi pi-shopping-cart'
            "
            class="tw-w-48 white-space-nowrap"
            [label]="isLoading() ? 'Agregando' : text"
            [disabled]="isLoading() ? true : disabled"
          ></p-button>
        } @else {
          <p-inputGroup>
            <p-inputGroupAddon class="p-custom-inputgroup">
              <p-button
                [severity]="valueQuantity() > 1 ? 'primary' : 'danger'"
                (click)="subtract()"
                [icon]="valueQuantity() > 1 ? 'pi pi-minus' : 'pi pi-trash'"
              ></p-button>
            </p-inputGroupAddon>
            <input
              appOnlyNumbers
              (input)="changeValue$.emit($event)"
              class="tw-w-12 tw-text-center"
              pInputText
              type="text"
              [value]="valueQuantity()"
            />
            <p-inputGroupAddon class="p-custom-inputgroup">
              <p-button
                [disabled]="entity.stock === valueQuantity()"
                (click)="add()"
                icon="pi pi-plus"
              ></p-button>
            </p-inputGroupAddon>
          </p-inputGroup>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopButtonComponent implements OnInit {
  shopStore = inject(ShopStore);
  el = inject(ElementRef);

  isAddedShoppingCart = signal(false);
  valueQuantity = signal(1);
  isLoading = signal(false);
  total = computed(() => this.entity.precioVenta * this.valueQuantity());
  changeValue$ = new EventEmitter();

  @Input()
  disabled = false;

  @Input()
  text = 'Comprar Ahora';

  @Input({ required: true })
  entity!: ProductoCart;

  constructor() {
    effect(
      () => {
        const exist = this.shopStore
          .entities()
          .find(({ id }) => id === this.entity.id);
        if (exist) {
          this.valueQuantity.set(Number(exist.cantidad));
          if (exist.cantidad === 0) {
            this.isAddedShoppingCart.set(false);
          }
        } else {
          this.isAddedShoppingCart.set(false);
        }
      },
      { allowSignalWrites: true },
    );
  }

  ngOnInit(): void {
    const exist = this.shopStore
      .entities()
      .find(({ id }) => id === this.entity.id);

    if (exist) {
      this.isAddedShoppingCart.set(true);
      this.valueQuantity.set(exist.cantidad);
    }

    this.changeValue$
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((event: Event) => this.changeValue(event));
  }

  changeValue(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.valueQuantity.set(Number(value));
    if (this.valueQuantity() > 0) {
      patchState(
        this.shopStore,
        setEntities([
          {
            ...this.entity,
            cantidad: this.valueQuantity(),
            total: this.total(),
          },
        ]),
      );
    } else {
      patchState(this.shopStore, removeEntity(this.entity.id));
      this.isAddedShoppingCart.set(false);
    }
  }

  addShoppingCart() {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.isAddedShoppingCart.set(true);
      this.valueQuantity.set(1);
      patchState(
        this.shopStore,
        addEntities([
          {
            ...this.entity,
            cantidad: this.valueQuantity(),
            total: this.total(),
          },
        ]),
      );
    }, 2500);
  }

  add() {
    this.valueQuantity.update((value) => ++value);
    patchState(
      this.shopStore,
      setEntities([
        { ...this.entity, cantidad: this.valueQuantity(), total: this.total() },
      ]),
    );
  }

  subtract() {
    if (this.valueQuantity() > 1) {
      this.valueQuantity.update((value) => --value);
      patchState(
        this.shopStore,
        setEntities([
          {
            ...this.entity,
            cantidad: this.valueQuantity(),
            total: this.total(),
          },
        ]),
      );
    } else {
      patchState(this.shopStore, removeEntity(this.entity.id));
      this.isAddedShoppingCart.set(false);
    }
  }
}
