import { Component } from '@angular/core';
import {verticleSlide, fadeInOut} from "./animations";

import { Globals} from "./globals";
import { SelectedFilterService } from "./services/selected-filter.service";
import {Router, NavigationEnd, ActivatedRoute } from "@angular/router";

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

  constructor(
    private globals: Globals,
    private selectedFilterService: SelectedFilterService,
    private router: Router,
    private route: ActivatedRoute){
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd){
        // swap the result type to the one in the path
        let resultType = this.route.firstChild.url.value[0].path;
        this.globals.updateResultType(resultType);
      }
    });
  }

  removeSelectedFilter(name: string, value: string){
    this.selectedFilterService.removeSelectedFilter(name, value);
  }

}
