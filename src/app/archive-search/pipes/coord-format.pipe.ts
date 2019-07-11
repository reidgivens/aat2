import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coordFormat'
})
export class CoordFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return null;
    let inangle = parseFloat(value);
    let degreeSign = '°';

    if(args){
      switch (args) {
        case 'DMS':
          let angD = Math.floor(inangle);
          let angDM = Math.floor(Math.abs(inangle - angD) * 60);
          let angDMS = (((Math.abs(inangle - angD) * 60) - angDM) * 60).toFixed(3);

          return angD + degreeSign + angDM + "'" + angDMS + '"';
        case 'HMS':
          let angH = Math.floor(inangle / 15); // 15 degree per Earth hour
          let angM = Math.floor(Math.abs((inangle / 15) - angH) * 60);
          let angS = (((Math.abs((inangle / 15) - angH) * 60) - angM) * 60).toFixed(3);

          return angH + 'h' + angM + 'm' + angS + 's';
        case 'rad':
          return (inangle * Math.PI / 180) + ' rad';
        default:
          return inangle + degreeSign;
      }
    }
      return null;
  }

}
