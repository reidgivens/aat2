import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'frequency'
})
export class FrequencyPipe implements PipeTransform {

  transform(value: any, precision?: number): any {
    const extensions = ['', 'kHz', 'MHz', 'GHz', 'THz', 'PHz', 'EHz', 'ZHz', 'YHz'];

    let size = parseInt(value);
    const scale = Math.floor(Math.log(size) / Math.log(10) / 3.0);

    if (!value || isNaN(size)) {
      return value;
    }
    if (precision === undefined ||isNaN(precision)){
      precision = 7;
    }

    if (scale === 0) {
      return size;
    }

    let reduced = size / (Math.pow(10, scale*3));

    return reduced.toFixed(precision) + ' ' + extensions[scale];
  }

}
