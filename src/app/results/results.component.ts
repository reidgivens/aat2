import { Component, OnInit } from '@angular/core';
import {verticleSlide} from "../animations";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  animations: [verticleSlide]
})
export class ResultsComponent implements OnInit {

  public resultType = 'Observations';
  public expandItems = false;

  constructor() { }

  ngOnInit() {
  }

}
