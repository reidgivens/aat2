import { Injectable } from '@angular/core';
import {HttpClient } from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {SelectedFilter} from "../model/selected-filter";
import {SelectedFilterService} from "./selected-filter.service";

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {

  // TODO: this should probably be put in some kind of config
  private serverAddress: string = 'https://webtest.aoc.nrao.edu/archiveIface/';

  private selectedFilters: Array<SelectedFilter> = [];
  private selectedFiltersSub: Subscription;

  constructor(private http: HttpClient, private selectedFilterService: SelectedFilterService) {
    this.selectedFiltersSub = this.selectedFilterService.selectedFilters$.subscribe(selectedFilters => {
      this.selectedFilters = selectedFilters;
    });
  }

  getResults(endPoint: string, start: number, rows: number): Observable<any> {
    let params = '?start=' + start + '&rows=' + rows;
    // the selected filters store each name value pair indivdually, and we need to collapse the multiselects
    let filterParams = {};
    for(let sf of this.selectedFilters){
      if(filterParams.hasOwnProperty(sf.name)){
        filterParams[sf.name] += ','+ sf.value;
      } else {
        filterParams[sf.name] = sf.value;
      }
    }
    for(let key in filterParams){
      if(filterParams.hasOwnProperty(key)){
        params += '&' + key + '=' + filterParams[key];
      }
    }
    params = encodeURI(params);
    console.log('Searching: ' + endPoint + params);
    return this.http.get(this.serverAddress + endPoint + params, {responseType: "json"});
  }

}
