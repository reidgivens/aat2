import {Component, Input, OnInit} from '@angular/core';
import {Observation} from "../model/observation";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {SelectedFilterService} from "../services/selected-filter.service";
import {SelectedFilter} from "../model/selected-filter";


@Component({
  selector: 'app-observation-results',
  templateUrl: './observation-results.component.html',
  styleUrls: ['./observation-results.component.scss']
})
export class ObservationResultsComponent implements OnInit {

  @Input() searchResults: Array<Observation> = [];
  public sortCol: string = '';
  public sortAsc: boolean = true;

  public selectedFilters: Array<SelectedFilter>;
  public selectedFiltersSub: Subscription;

  constructor( private selectedFilterService: SelectedFilterService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
  this.selectedFiltersSub = this.selectedFilterService.selectedFilters$.subscribe( selectedFilters => {
    this.selectedFilters = selectedFilters;
    for(let filter of this.selectedFilters){
      if(filter.name == 'sort') {
        let sortParts = filter.value.split('+');
        this.sortCol = sortParts[0];
        this.sortAsc = (sortParts[1] === 'asc');
      }
    }
  });
  }

  setSort(field: string){
    if(field == this.sortCol){
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortAsc = true;
    }
    this.sortCol = field;
    this.router.navigate([], { relativeTo: this.route, queryParams: { sort: field + (this.sortAsc ? '+asc' : '+desc')}, queryParamsHandling: "merge" });

  }

}
