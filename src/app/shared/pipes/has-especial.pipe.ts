import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hasEspecial',
  standalone: true
})
export class HasEspecialPipe implements PipeTransform {

  transform(value: string): boolean {
    return /(?=.*[!@#\$%\^&\*\(\)_\+\-=\[\]{};':"\\|,.<>\/?])/.test(value);
  }

}
