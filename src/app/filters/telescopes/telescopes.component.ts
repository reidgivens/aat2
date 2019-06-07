import { Component, OnInit } from '@angular/core';
import {verticleSlide} from "../../animations";

@Component({
  selector: 'app-telescopes',
  templateUrl: './telescopes.component.html',
  styleUrls: ['./telescopes.component.scss'],
  animations: [verticleSlide]
})
export class TelescopesComponent implements OnInit {

  public isCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

}
