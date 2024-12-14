import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [MatProgressSpinner, MatIcon],
  template: `
    <div class="tw-relative tw-w-full tw-h-full">
      @if (isLoading) {
        <div class="tw-absolute tw-inset-0 bg-opacity tw-z-50">
          <div class="tw-flex tw-justify-center tw-items-center tw-h-full">
            <mat-spinner [diameter]="diameter" />
          </div>
        </div>
      }
      @if (failed) {
        <div class="tw-p-8 tw-text-center tw-text-red-500 tw-min-h-40">
          <mat-icon>error</mat-icon>
          <p>{{ failed }}</p>
        </div>
      } @else {
        <ng-content />
      }
    </div>
  `,
})
export class LoadingComponent {
  @Input()
  isLoading = false;

  @Input()
  failed: string | boolean | null = null;

  @Input()
  diameter = 80;
}
