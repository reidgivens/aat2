import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (isNaN(value) || value == 0) return '0 Bytes';

    const sizes: Array<string> = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
    const k: number = 1024;
    const filledDot: string = '●';
    const emptyDot: string = '○';
    const i = Math.floor(Math.log(value) / Math.log(k));

    if(args && args == 'withDots') {
      return parseFloat((value / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i] + ' ' + filledDot.repeat(i) + emptyDot.repeat(4 - i);
    } else {
      return parseFloat((value / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];

    }
  }

}
