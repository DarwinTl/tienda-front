import { Component, ContentChild } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-error-field',
  standalone: true,
  imports: [MatError],
  template: ` <mat-error>{{ 'Campo requerido' }}</mat-error> `,
  styles: ``,
})
export class ErrorFieldComponent {
  @ContentChild(NgControl)
  ngControl: NgControl | null = null;
}
