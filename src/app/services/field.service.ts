import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  constructor() { }

  getFacets(fieldName: string){
    switch (fieldName) {
      case 'telescope':
        return [
          { name: 'VLA', count: 12345},
          { name: 'VLBA', count: 12345},
          { name: 'ALMA', count: 12345}
        ];
      case 'configuration':
        return [
          { name: 'A', count: 14832},
          { name: 'A->D', count: 2283},
          { name: 'B', count: 18603},
          { name: 'B->A', count: 1},
          { name: 'B->BnA', count: 510},
          { name: 'BnA', count: 1826},
          { name: 'BnA->A', count: 1549},
          { name: 'C', count: 15849},
          { name: 'C->B', count: 720},
          { name: 'C->CnB', count: 365},
          { name: 'CnB', count: 1655},
          { name: 'CnB->B', count: 622},
          { name: 'D', count: 17704},
          { name: 'D->C', count: 237},
          { name: 'D->DnC', count: 228},
          { name: 'DnC', count: 1941},
          { name: 'DnC->C', count: 382},
          { name: 'DnC-C', count: 60}
        ];
      case 'polarization':
        return [
          { name: 'RR', count: 36298722 },
          { name: 'LL', count: 1060769 },
          { name: 'RR, LL', count: 205353 },
          { name: 'RR, RL, LR, LL', count: 1041822 },
          { name: 'XX', count: 629 },
          { name: 'XX, YY', count: 204819 },
          { name: 'XX, XY, YX, YY', count: 15875 }
        ];
      case 'receivers':
        return [
          { name: 'C', count: 17939 },
          { name: 'K', count: 7868 },
          { name: 'KA', count: 5228 },
          { name: 'KU', count: 4439 },
          { name: 'L', count: 14859 },
          { name: 'P', count: 2490 },
          { name: 'S', count: 7016 },
          { name: 'Q', count: 4068 },
          { name: 'X', count: 27033 },
          { name: '06', count: 11101 },
          { name: '03', count: 7121 },
          { name: '07', count: 3668 },
          { name: '04', count: 866 },
          { name: '08', count: 590 },
          { name: '05', count: 211 },
          { name: '09', count: 172 },
          { name: '4', count: 50 },
          { name: '10', count: 14 },
          { name: 'Unspecified', count: 1 },
          { name: 'Subband:0', count: 18463 },
          { name: 'Subband:1', count: 5780 },
          { name: 'Subband:2', count: 5595 },
          { name: 'Subband:3', count: 5571 },
          { name: 'Subband:4', count: 5206 },
          { name: 'Subband:5', count: 5158 },
          { name: 'Subband:6', count: 5089 },
          { name: 'Subband:7', count: 5073 },
          { name: 'Subband:8', count: 701 },
          { name: 'Subband:9', count: 695 },
          { name: 'Subband:10', count: 692 },
          { name: 'Subband:11', count: 691 },
          { name: 'Subband:12', count: 640 },
          { name: 'Subband:13', count: 640 },
          { name: 'Subband:14', count: 596 },
          { name: 'Subband:15', count: 586 },
          { name: 'Subband:110', count: 1 },
          { name: 'Subband:111', count: 1 },
          { name: 'Subband:112', count: 1 },
          { name: 'Subband:113', count: 1 },
          { name: 'Subband:255', count: 6 }
        ];
      default:
        return [];
    }
  }
}
