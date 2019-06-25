import { AbstractControl } from '@angular/forms';

export function ValidateDate(control: AbstractControl) {
  if(control.value !== null) {
    let val: string;
    // if they used the ngDatePicker, the value returned is an object rather than a string
    if (control.value && typeof control.value == "object" && control.value.hasOwnProperty('year')) {
      val = control.value.year + '-' + (control.value.month < 10 ? '0' : '') + control.value.month + '-' + (control.value.day < 10 ? '0' : '') + control.value.day;
    } else {
      val = control.value;
    }
    let matches = val.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (matches == null) {
      return {invalidDate: true};
    }
  }
  return null;
}
