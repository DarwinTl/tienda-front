import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appOnlyLetters]',
  standalone: true
})
export class OnlyLettersDirective {
  el = inject(ElementRef);
  
  @HostListener('input', ['$event'])
  onInputChange(event: InputEvent) {
    const initalValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initalValue.replace(/[^a-zA-ZñáéíóúäëïöüÑÁÉÍÓÚÄËÏÖÜ'\s]+/, '');
    // this.el.nativeElement.value = initalValue.replace(/[^a-zA-Z]*/g, '');
    if ( initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
