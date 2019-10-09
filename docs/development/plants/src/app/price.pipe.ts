import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (typeof value == 'string') {
      value = parseFloat(value);
    }
    return value.toFixed(2) + ' руб.';
  }
}
