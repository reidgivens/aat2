import { Component, OnInit } from '@angular/core';
import {SelectedFilter} from "../model/selected-filter";
import {Subscription} from "rxjs";
import {SelectedFilterService} from "../services/selected-filter.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoadFiltersComponent} from "./load-filters/load-filters.component";
import {SaveFiltersComponent} from "./save-filters/save-filters.component";

@Component({
  selector: 'app-selected-filters',
  templateUrl: './selected-filters.component.html',
  styleUrls: ['./selected-filters.component.scss']
})
export class SelectedFiltersComponent implements OnInit {

  public selectedFilters: Array<SelectedFilter>;
  public selectedFiltersSub: Subscription;

  constructor(private selectedFilterService: SelectedFilterService, private modalService: NgbModal) { }

  ngOnInit() {
    this.selectedFiltersSub = this.selectedFilterService.selectedFilters$.subscribe(selectedFilters => {
      this.selectedFilters = selectedFilters;
    });
  }

  removeSelectedFilter(name: string, value: string){
    this.selectedFilterService.removeSelectedFilter(name, value);
  }

  clearAllFilters(){
    this.selectedFilterService.clearFilters();
  }

  openSaveFilters(){
    this.modalService.open(SaveFiltersComponent).result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log(reason);
    });
  }

  openLoadFilters(){
    this.modalService.open(LoadFiltersComponent).result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log(reason);
    });
  }

  ngOnDestroy() {
    if (this.selectedFiltersSub) { this.selectedFiltersSub.unsubscribe(); }
  }

}
