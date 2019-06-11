import { Component } from '@angular/core';
import {verticleSlide} from "./animations";
import {Collection} from "./model/collection";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [verticleSlide]
})
export class AppComponent {
  title = 'archive2';

  collection = Collection.DEFAULT_COLLECTION;

  public showFilterList = true;
  public expandItems = false;
  public activeSearchFilters = [];

}
