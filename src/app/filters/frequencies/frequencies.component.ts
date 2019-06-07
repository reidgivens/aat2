import { Component, OnInit } from '@angular/core';
import {verticleSlide} from "../../animations";

@Component({
  selector: 'app-frequencies',
  templateUrl: './frequencies.component.html',
  styleUrls: ['./frequencies.component.scss'],
  animations: [verticleSlide]
})
export class FrequenciesComponent implements OnInit {

  public isCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

}
