import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hasLower',
  standalone: true
})
export class HasLowerPipe implements PipeTransform {

  transform(value: string): boolean {
    return /[a-z]/.test(value);
  }

}
