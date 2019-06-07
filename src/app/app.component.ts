import { Component } from '@angular/core';
import {verticleSlide} from "./animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [verticleSlide]
})
export class AppComponent {
  title = 'archive2';
  public showNav = true;
  public showFilterList = true;
}
