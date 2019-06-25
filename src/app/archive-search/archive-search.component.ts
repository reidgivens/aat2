import { Component, OnInit } from '@angular/core';
import {SelectedFilter} from "./model/selected-filter";
import {Subscription} from "rxjs";
import {Globals} from "./globals";
import {SelectedFilterService} from "./services/selected-filter.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {fadeInOut, verticleSlide} from "../animations";
import {ResultType} from "./model/result-type";

@Component({
  selector: 'app-archive-search',
  templateUrl: './archive-search.component.html',
  styleUrls: ['./archive-search.component.scss'],
  animations: [verticleSlide, fadeInOut]
})
export class ArchiveSearchComponent implements OnInit {

  public showFilterList = true;
  public expandItems = false;
  public selectedFilters: Array<SelectedFilter>;
  public selectedFiltersSub: Subscription;
  public resultType: ResultType; // the active result type
  private resultTypeSub: Subscription; // subscribtion to the active result type

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

    this.resultTypeSub = this.globals.resultType$.subscribe( resultType => {
      this.resultType = resultType;
    });

    this.selectedFiltersSub = this.selectedFilterService.selectedFilters$.subscribe(selectedFilters => {
      this.selectedFilters = selectedFilters;
    });
  }

  ngOnInit(): void {
  }

  removeSelectedFilter(name: string, value: string){
    this.selectedFilterService.removeSelectedFilter(name, value);
  }

  ngOnDestroy() {
    if (this.selectedFiltersSub) { this.selectedFiltersSub.unsubscribe(); }
  }

}
