import { Component, OnInit } from '@angular/core';
import {verticleSlide} from "../../animations";

@Component({
  selector: 'app-source-position',
  templateUrl: './source-position.component.html',
  styleUrls: ['./source-position.component.scss'],
  animations: [verticleSlide]
})
export class SourcePositionComponent implements OnInit {

  public isCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

}
