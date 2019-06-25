import { AbstractControl } from '@angular/forms';

export function ValidateFrequency(control: AbstractControl) {
  if (isNaN(control.value)) {
    return { invalidFrequency: true };
  }
  return null;
}
