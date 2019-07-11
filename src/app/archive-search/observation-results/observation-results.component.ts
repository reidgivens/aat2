import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-observation-results',
  templateUrl: './observation-results.component.html',
  styleUrls: ['./observation-results.component.scss']
})
export class ObservationResultsComponent implements OnInit {

  @Input() searchResults: Array<any> = [];

  constructor() {}

  ngOnInit() {
  }

}
