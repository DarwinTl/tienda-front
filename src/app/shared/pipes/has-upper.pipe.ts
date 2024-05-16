import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hasUpper',
  standalone: true
})
export class HasUpperPipe implements PipeTransform {

  transform(value: string): unknown {
    return /[A-Z]/.test(value);
  }

}
