import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image-results',
  templateUrl: './image-results.component.html',
  styleUrls: ['./image-results.component.scss']
})
export class ImageResultsComponent implements OnInit {

  @Input() searchResults: Array<any> = [];

  constructor() { }

  ngOnInit() {
  }

}
