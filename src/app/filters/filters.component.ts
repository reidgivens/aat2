import {Component, ViewChild, ViewContainerRef, OnInit} from '@angular/core';
import { Globals} from "../globals";
import { ResultType } from "../model/result-type";
import { FilterService } from "../services/filter.service";
import {verticleSlide} from "../animations";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  animations: [verticleSlide]
})
export class FiltersComponent implements OnInit {

  public isResultTypeCollapsed = false;

  public exposeSecondaryFilters = false;
  private resultType: ResultType;

  @ViewChild('primary', {read: ViewContainerRef }) primaryViewContainerRef: ViewContainerRef;
  @ViewChild('secondary', {read: ViewContainerRef }) secondaryViewContainerRef: ViewContainerRef;

  constructor(private globals: Globals, private filterService: FilterService) {
    this.resultType = globals.resultType;
  }

  ngOnInit() {
    this.loadPrimaryFilters();
  }

  private setResultType(name: string){
    this.globals.resultType = this.globals.resultType.setResultType(name);
    this.resultType = this.globals.resultType;
    this.loadPrimaryFilters();
    this.exposeSecondaryFilters = false;
  }

  loadPrimaryFilters(){
    this.primaryViewContainerRef.clear();
    for (let v of this.resultType.primaryFilters){
      this.filterService.loadFilter(this.primaryViewContainerRef, v);
    }
  }

  toggleSecondaryFilters(){
    this.exposeSecondaryFilters = !this.exposeSecondaryFilters;
    if(this.exposeSecondaryFilters){
      for (let v of this.resultType.secondaryFilters) {
        this.filterService.loadFilter(this.secondaryViewContainerRef, v);
      }
    } else {
      this.secondaryViewContainerRef.clear();
    }
  }

}
