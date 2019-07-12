import {Component, Input, OnInit} from '@angular/core';
import {Observation} from "../model/observation";

@Component({
  selector: 'app-observation-results',
  templateUrl: './observation-results.component.html',
  styleUrls: ['./observation-results.component.scss']
})
export class ObservationResultsComponent implements OnInit {

  @Input() searchResults: Array<Observation> = [];

  constructor() {}

  ngOnInit() {
  }

}
