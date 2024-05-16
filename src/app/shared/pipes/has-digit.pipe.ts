import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hasDigit',
  standalone: true
})
export class HasDigitPipe implements PipeTransform {

  transform(value: string): boolean {
    console.log(/\d/.test(value));
    
    return /\d/.test(value);
  }

}
