import { Component, OnInit } from '@angular/core';
import {verticleSlide} from "../../animations";

@Component({
  selector: 'app-receivers',
  templateUrl: './receivers.component.html',
  styleUrls: ['./receivers.component.scss'],
  animations: [verticleSlide]
})
export class ReceiversComponent implements OnInit {

  public isCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

}
