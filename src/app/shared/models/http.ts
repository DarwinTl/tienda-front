import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export class ApiHttpBase {
  http = inject(HttpClient);
}
