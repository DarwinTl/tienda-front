import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export class HttpBase {
  protected http = inject(HttpClient);
}
