import { AfterViewInit, Component, ContentChild, ElementRef, inject, NgZone, signal } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ErrorFieldComponent } from '@components/error-field/error-field.component';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [ErrorFieldComponent],
  template: `
    <ng-content></ng-content>
    <div class="tw-min-h-4 tw-mb-3">
      <app-error-field [ngControl]="ngControl" [touched]="touched()" />
    </div>
  `,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'tw-grid'
  }
})
export class FormFieldComponent implements AfterViewInit {
  @ContentChild(NgControl)
  ngControl: NgControl | null = null;
  ngZone = inject(NgZone);
  el: ElementRef<HTMLDivElement> = inject(ElementRef);

  touched = signal(false);

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      const observer = new MutationObserver(() => {
        if (this.el.nativeElement.querySelector('.mdc-text-field--invalid')) {
          this.ngZone.run(() => {
            this.touched.set(true);
            observer.disconnect();
          });
        }
      });

      observer.observe(this.el.nativeElement, {
        attributes: true,
        attributeFilter: ['class'],
        childList: true,
        subtree: true
      });
    });
  }
}
