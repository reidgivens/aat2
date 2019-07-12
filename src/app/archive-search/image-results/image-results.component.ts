import {Component, Input, OnInit} from '@angular/core';
import {Image} from "../model/image";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {SelectedFilterService} from "../services/selected-filter.service";
import {SelectedFilter} from "../model/selected-filter";

@Component({
  selector: 'app-image-results',
  templateUrl: './image-results.component.html',
  styleUrls: ['./image-results.component.scss']
})
export class ImageResultsComponent implements OnInit {

  @Input() searchResults: Array<Image> = [];
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


  getLat(latLng: string){
    let coords = latLng.split(',');
    return parseFloat(coords[0]);
  }

  getLng(latLng: string){
    let coords = latLng.split(',');
    return parseFloat(coords[1]) + 180;
  }

}
