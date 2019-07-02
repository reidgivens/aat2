import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {SelectedFilter} from "../model/selected-filter";
import {SelectedFilterService} from "./selected-filter.service";
import {EnvService } from "../../env/env.service";
import {Field} from "../model/field";

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {

  private serverAddress: string = '';

  private selectedFilters: Array<SelectedFilter> = [];
  private selectedFiltersSub: Subscription;

  constructor(private http: HttpClient, private selectedFilterService: SelectedFilterService, private env: EnvService) {
    this.serverAddress = env.apiUrl;
    this.selectedFiltersSub = this.selectedFilterService.selectedFilters$.subscribe(selectedFilters => {
      this.selectedFilters = selectedFilters;
    });
  }

  getResults(endPoint: string, start: number, rows: number): Observable<any> {
    let params = {start: start, rows: rows};

    for(let sf of this.selectedFilters){
      let field = Field.getField(sf.name);
      if(field){
        if(field.allowMultipleValues){
          if(!params.hasOwnProperty(sf.name)){
            params[sf.name] = [];
          }
          params[sf.name].push(sf.value);
        } else {
          params[sf.name] = sf.value;
        }
      }
    }
    /*for(let p in params){
      if(typeof params[p] == 'object'){
        params[p] = JSON.stringify(params[p]);
      }
      console.warn(params[p]);
      console.log(typeof params[p]);
    }*/
    console.log('Searching: ' + endPoint);
    console.log(params);

    const httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    // return this.http.get(this.serverAddress + endPoint + params, {responseType: "json", observe: 'response'});
    return this.http.post(this.serverAddress + endPoint, params, {headers: httpHeaders, observe: 'response', responseType: 'json'});
  }

}
