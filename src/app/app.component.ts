import { Component } from '@angular/core';
import {verticleSlide, fadeInOut} from "./animations";

import { Globals} from "./globals";
import { SelectedFilterService } from "./services/selected-filter.service";
import {Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import {SelectedFilter} from "./model/selected-filter";
import {Subscription} from "rxjs";

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
  public selectedFilters: Array<SelectedFilter>;
  public selectedFiltersSub: Subscription;

  constructor(
    private globals: Globals,
    private selectedFilterService: SelectedFilterService,
    private router: Router,
    private route: ActivatedRoute){
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd){
        // swap the result type to the one in the path
        let resultType = this.route.snapshot.firstChild.url[0].path;
        if(resultType !== this.globals.resultType.name) {
          this.globals.updateResultType(resultType);
        }
      }
    });

    this.selectedFiltersSub = this.selectedFilterService.selectedFilters$.subscribe(selectedFilters => {
      this.selectedFilters = selectedFilters;
    });
  }

  removeSelectedFilter(name: string, value: string){
    this.selectedFilterService.removeSelectedFilter(name, value);
  }

}
