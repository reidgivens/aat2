import { Component, OnInit } from '@angular/core';
import {verticleSlide} from "../../animations";

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss'],
  animations: [verticleSlide]
})
export class DatesComponent implements OnInit {

  public isCollapsed = false;

  constructor() { }

  ngOnInit() {
  }

}
