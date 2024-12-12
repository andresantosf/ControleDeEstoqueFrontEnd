import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descricaoTipoEquipamento',
  standalone: true
})
export class descricaoTipoEquipamentoPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'front-end': return 'code';
      case 'back-end': return 'computer';
    }
    return 'code';
  }

}
