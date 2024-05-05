import { Component } from '@angular/core';

@Component({
  selector: 'app-main-container',
  standalone: true,
  template: `
    <div class="max-w-3xl mx-auto">
      <ng-content />
    </div>
  `,
})
export class MainContainerComponent {}
