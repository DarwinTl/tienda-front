import { Component, ContentChild } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [MatFormField],
  template: `
    <mat-form-field>
      <ng-content></ng-content>
    </mat-form-field>
  `,
  styles: ``,
})
export class FormFieldComponent {
  @ContentChild(NgControl)
  ngControl: NgControl | null = null;
}
