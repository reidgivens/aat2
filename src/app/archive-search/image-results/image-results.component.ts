import {Component, Input, OnInit} from '@angular/core';
import {Image} from "../model/image";

@Component({
  selector: 'app-image-results',
  templateUrl: './image-results.component.html',
  styleUrls: ['./image-results.component.scss']
})
export class ImageResultsComponent implements OnInit {

  @Input() searchResults: Array<Image> = [];

  constructor() { }

  ngOnInit() {
  }

  getLat(latLng: string){
    let coords = latLng.split(',');
    return parseFloat(coords[0]);
  }

  getLng(latLng: string){
    let coords = latLng.split(',');
    return parseFloat(coords[1]) + 180;
  }

}
