import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[min]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinDirective, multi: true}]
})
export class MinDirective {
  min: number;

  @Input('min') set setMin(value: string) {
    this.min = parseInt(value);
  }
  
  validate(ctrl: AbstractControl): Object {
    return (ctrl.value < this.min) ? { 'toosmall': true } : null;
  }
}
