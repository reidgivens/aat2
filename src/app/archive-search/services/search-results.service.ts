import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
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

  getObservationDetails(id: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('solr_id', id);
    console.warn('Obs Details Query');
    console.log(params);
    return this.http.get(this.serverAddress + 'restapi_get_full_exec_block_details', {observe: "response", params: params});
  }

  getProjectDetails(id: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('project_code', '"' + id + '"');
    console.warn('Project Details Query');
    console.log(params);
    return this.http.get(this.serverAddress + 'restapi_get_paged_exec_blocks', {observe: "response", params: params});
  }

}
