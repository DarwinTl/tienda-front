import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, Input, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl, ValidationErrors } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { ErrorDictionary, ERRORS_DICTIONARY } from '@shared/validators/error.dictionary';

@Component({
  selector: 'app-error-field',
  standalone: true,
  imports: [MatError, AsyncPipe, JsonPipe],
  template: `
  @if (touched) {
    <div class="tw-ml-2 error-invalid">
      @for (error of errors(); track error) {
        <p class="tw-text-sm tw-text-red-700">{{ error }}</p>
      }
    </div>
  }
  `,
  styles: `
    .error-invalid {
      display: none;
    }
    .ng-invalid .error-invalid {
      display: block;
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorFieldComponent implements OnInit {
  destroy = inject(DestroyRef);
  @Input({ required: true })
  ngControl: NgControl | null = null;

  @Input()
  touched: boolean = false;

  error = signal<ValidationErrors | null | undefined >(null);
  errors = computed(() => {
    const errorsObj = this.error();
    if (!errorsObj) {
      return [];
    }
    return Object.keys(errorsObj).map((key) => {
      const k = key as keyof ErrorDictionary;
      return ERRORS_DICTIONARY[k] || ERRORS_DICTIONARY['default'];
    });
  });

  ngOnInit(): void {
    this.error.set(this.ngControl?.control?.errors);
    this.ngControl?.control?.valueChanges.pipe(debounceTime(250), distinctUntilChanged(), takeUntilDestroyed(this.destroy)).subscribe(() => {
      this.error.set(this.ngControl?.control?.errors);
    });
    
  }
}
