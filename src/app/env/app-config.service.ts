import { Injectable } from '@angular/core';
import { EnvService } from "./env.service";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  configUrl = 'restapi_get_application_parameters';
  facetUrl = 'restapi_get_execution_block_facets';

  constructor(private http: HttpClient, private env: EnvService) { }

  getConfig() {
    return this.http.get(this.env.apiUrl + this.configUrl, {responseType: "json"});
  }

  // we want to load facets only once per session - so it feels like they are config variables.
  getFacets(){
    return this.http.get(this.env.apiUrl + this.facetUrl, {responseType: "json"});
  }
}
