import { Component, OnInit } from '@angular/core';
import {verticleSlide} from "../animations";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [verticleSlide]

})
export class HeaderComponent implements OnInit {

  public showNav = true;

  constructor() { }

  ngOnInit() {
  }

}
