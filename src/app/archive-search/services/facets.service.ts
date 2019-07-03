import { Injectable } from '@angular/core';
import { AppConfigService } from "../../env/app-config.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {ResultType} from "../model/result-type";

/*
 This service is for communicating facets between all filters and archive-search.
 The filters themselves are dynamically generated, so we can't bind facets through the template.
 Facets are retrieved from the server in the env/app-config.service.
 The archive-search.component actually subscribes to appConfig, gets the results and sends them here.
 All the filters pull from here. Because archive-search loads the filters, this should be all set before
 anything else needs it.
 */

@Injectable({
  providedIn: 'root'
})
export class FacetsService {

  private facets: any;

  getFacets(){
    return this.facets;
  }

  setFacets(facets:any){
    this.facets = facets;
  }

  getFacet(name:string){
    if(this.facets && this.facets.hasOwnProperty(name)){
      return this.facets[name];
    } else {
      return false;
    }
  }

}
