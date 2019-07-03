import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
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
    let params = new HttpParams();

    params = params.append('start', start.toString());
    params = params.append('rows', rows.toString());

    for (const key of this.selectedFilters) {
      let field = Field.getField(key.name);
      if(field){
        params = params.append(key.name, JSON.stringify(key.value));
      }
    }
    return this.http.get(this.serverAddress + endPoint, {observe: 'response', params: params});
  }

}
