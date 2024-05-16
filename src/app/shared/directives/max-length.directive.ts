import { Directive, ElementRef, HostListener, inject, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appMaxLength]',
  standalone: true
})
export class MaxLengthDirective {
  el = inject(ElementRef);
  ngControl = inject(NgControl,  {optional: true });

  @Input({ required: true })
  appMaxLength?: number;

  @HostListener('input', ['$event'])
  onInputChange(event: InputEvent) {
    const initalValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initalValue.slice(0, this.appMaxLength);
    if (initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
    this.ngControl?.control?.setValue(this.el.nativeElement.value);
  }
}
