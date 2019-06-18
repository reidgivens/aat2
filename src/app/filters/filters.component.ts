import {Component, ViewChild, ViewContainerRef, OnInit} from '@angular/core';
import {Globals} from "../globals";
import {ResultType} from "../model/result-type";
import {FilterService} from "../services/filter.service";
import {verticleSlide} from "../animations";
import {Observable} from "rxjs";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  animations: [verticleSlide]
})
export class FiltersComponent implements OnInit {

  public isResultTypeCollapsed = false;
  public resultTypes = ResultType.getResultTypes();
  public exposeSecondaryFilters = false;
  private resultType$: Observable<ResultType>;

  @ViewChild('primary', {read: ViewContainerRef}) primaryViewContainerRef: ViewContainerRef;
  @ViewChild('secondary', {read: ViewContainerRef}) secondaryViewContainerRef: ViewContainerRef;

  constructor(private globals: Globals, private filterService: FilterService) {
  }

  ngOnInit() {
    //this.resultType$ = this.globals.watchResultType();
    this.globals.watchResultType.subscribe((resultType: ResultType) => {
      this.resultType$ = resultType;
      this.loadFilters();
    });

  }

  private loadFilters() {
    this.primaryViewContainerRef.clear();
    this.secondaryViewContainerRef.clear();
    this.exposeSecondaryFilters = false;
    this.loadPrimaryFilters();
  }

  loadPrimaryFilters() {
    for (let v of this.resultType$.primaryFilters) {
      this.filterService.loadFilter(this.primaryViewContainerRef, v);
    }
  }

  toggleSecondaryFilters() {
    this.exposeSecondaryFilters = !this.exposeSecondaryFilters;
    if (this.exposeSecondaryFilters) {
      for (let v of this.resultType$.secondaryFilters) {
        this.filterService.loadFilter(this.secondaryViewContainerRef, v);
      }
    } else {
      this.secondaryViewContainerRef.clear();
    }
  }

}
