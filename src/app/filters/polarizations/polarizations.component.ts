import { Component, OnInit } from '@angular/core';
import {verticleSlide} from "../../animations";

@Component({
  selector: 'app-polarizations',
  templateUrl: './polarizations.component.html',
  styleUrls: ['./polarizations.component.scss'],
  animations: [verticleSlide]
})
export class PolarizationsComponent implements OnInit {

  public isCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

}
