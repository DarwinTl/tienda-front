import { Component } from '@angular/core';

@Component({
  selector: 'app-main-container',
  standalone: true,
  template: `
    <div class="tw-max-w-3xl tw-mx-auto">
      <ng-content />
    </div>
  `,
})
export class MainContainerComponent {}
