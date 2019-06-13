import { Component } from '@angular/core';
import {verticleSlide} from "./animations";

import { Globals} from "./globals";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [verticleSlide]
})
export class AppComponent {
  title = 'archive2';

  public showFilterList = true;
  public expandItems = false;

  constructor(private globals: Globals){

  }

}
