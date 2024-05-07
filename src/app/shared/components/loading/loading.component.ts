import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [MatProgressSpinner, MatIcon],
  template: `
    <div class="relative w-full h-full">
      @if (isLoading) {
        <div class="absolute inset-0 bg-opacity z-20">
          <div class="flex justify-center items-center h-full">
            <mat-spinner [diameter]="diameter" />
          </div>
        </div>
      } 
      @if (failed) {
        <div class="p-8 text-center text-red-500 min-h-40">
          <mat-icon>error</mat-icon>
          <p>{{ failed }}</p>
        </div>
      } @else {
        <ng-content />
      }
    </div>
  `,
  styles: ``,
})
export class LoadingComponent {
  @Input()
  isLoading = false;

  @Input()
  failed: string | boolean | null = null;

  @Input()
  diameter = 80;
}
