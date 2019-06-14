import { Component } from '@angular/core';
import {verticleSlide, fadeInOut} from "./animations";
import { FormGroup, FormControl } from "@angular/forms";

import { Globals} from "./globals";
import { SelectedFilterService } from "./services/selected-filter.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [verticleSlide, fadeInOut]
})
export class AppComponent {
  title = 'archive2';

  public showFilterList = true;
  public expandItems = false;

  searchControlGroup = new FormGroup({
    searchFormControl: new FormControl('', {updateOn: "change"})
  });

  constructor(private globals: Globals, private selectedFilterService: SelectedFilterService){

  }

  removeSelectedFilter(name: string, value: string){
    this.selectedFilterService.removeSelectedFilter(name, value);
  }

}
