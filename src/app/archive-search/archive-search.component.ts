import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { AppConfigService } from "../env/app-config.service";
import { FacetsService } from "./services/facets.service";
import {ResultTypeService} from "./services/result-type.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ResultType} from "./model/result-type";
import {SearchResultsService} from "./services/search-results.service";
import {SelectedFilterService} from "./services/selected-filter.service";
import {Field} from "./model/field";

@Component({
  selector: 'app-archive-search',
  templateUrl: './archive-search.component.html',
  styleUrls: ['./archive-search.component.scss']
})
export class ArchiveSearchComponent implements OnInit {

  public showFilterList = true;
  public expandItems = false;
  public spinner: boolean = true;
  public spinnerText: string = 'Loading';

  public resultType: ResultType; // the active result type
  private resultTypeSub: Subscription; // subscribtion to the active result type

  public config: any;
  private configSub: Subscription;
  public facets: any;
  private facetSub: Subscription;

  public allowedResultsPerPage: Array<number> = [25,50,100,200];
  public resultsPerPage: number = 25;
  public currentPage: number = 1;
  public searchResults: Array<any> = [];
  public numResults: number = 0;
  public pages: number = 1;

  constructor(
    private appConfig: AppConfigService,
    private facetService: FacetsService,
    private resultTypeService: ResultTypeService,
    private selectedFilterService: SelectedFilterService,
    private router: Router,
    private route: ActivatedRoute,
    private searchResultsService: SearchResultsService){

    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        // swap the result type to the one in the path
        let resultType = this.route.snapshot.firstChild.url[0].path;
        if (!this.resultType || resultType !== this.resultType.name) {
          this.spinner = true;
          this.spinnerText = 'Loading Search Type';
          this.resultTypeService.updateResultType(resultType);
        }
      }
    });
    this.spinnerText = 'Configuring';
    this.loadConfig();

  }

  ngOnInit(): void {
  }

  loadConfig(){
    this.configSub = this.appConfig.getConfig().subscribe((config:string) => {
      this.config = JSON.parse(config);
      this.spinnerText = 'Getting Filter Options';
      this.loadFacets();
    });
  }

  loadFacets(){
    this.facetSub = this.appConfig.getFacets().subscribe((facets:string) => {
      this.facets = JSON.parse(facets).facet_list;
      this.facetService.setFacets(this.facets);
      this.spinnerText = 'Loading Search Type';
      this.loadResultType();
    });
  }

  loadResultType(){
    this.resultTypeSub = this.resultTypeService.resultType$.subscribe( resultType => {
      this.resultType = resultType;
      this.spinner = false;
      this.spinnerText = 'Loading';
      this.loadUrlParams();
    });
  }

  loadUrlParams(){
    // check the queryParams
    let queryParams = this.route.snapshot.queryParamMap;
    let fields = Field.getFields();
    // iterate over the queryParams
    for (let qp of queryParams.keys) {
      qp = qp.toLowerCase();
      if (fields.indexOf(qp) !== -1) { // make sure it's a valid field
        let field = Field.getField(qp);
        if (field.allowMultipleValues) {
          let qpv = queryParams.getAll(qp);
          if (qpv && qpv.length > 0) { // first make sure we have anything
            if (this.facets.hasOwnProperty(field.name)) { // get the valid values for this field
              let facets = this.facets[field.name]; // to test for valid value
              for (let f of facets) {
                for (let aVal of qpv) {
                  if (f.name.toLowerCase() == aVal.toLowerCase()) {
                    this.selectedFilterService.addSelectedFilter(field.label, field.name, f.name);
                  }
                }
              }
            } else {
              console.warn('No facets found for ' + field.name);
            }
          }
        } else {
          let qpv = queryParams.get(qp);
          if (qpv && qpv.length > 0) { // make sure we have something
            this.selectedFilterService.addReplaceSelectedFilter(field.label, field.name, qpv);
          }
        }
      }
    }
    this.selectedFilterService.sortSelectedFilters();
    this.getSearchResults();
  }

  setResultsPerPage(rows: number){
    if(this.allowedResultsPerPage.indexOf(rows) == -1){
      return false;
    }
    this.resultsPerPage = rows;
    this.pages = Math.ceil(this.numResults / this.resultsPerPage);
    this.currentPage = 1;
    this.getSearchResults();
  }

  goToPage(page: number){
    if(page < 1){ page = 1; }
    if(page > this.pages){ page = this.pages; }
    if(this.currentPage == page){
      return false;
    }
    this.currentPage = page;
    this.getSearchResults();
    return true;
  }

  getPages(){
    return new Array(this.pages);
  }

  getSearchResults(){
    this.searchResults = [];
    this.pages = 1;
    this.spinnerText = 'Getting Search Results';
    this.spinner = true;
    this.searchResultsService.getResults(this.resultType.resultsEndPoint, this.resultsPerPage * (this.currentPage - 1), this.resultsPerPage).subscribe((searchResults) => {
      const keys = searchResults.headers.keys();
      let headers = keys.map(key => `${key}: ${searchResults.headers.get(key)}`);
      let jsonSearchResults = JSON.parse(searchResults.body);
      this.searchResults = jsonSearchResults.data;
      this.numResults = jsonSearchResults.n_results;
      this.pages = Math.ceil(this.numResults / this.resultsPerPage);
      this.spinner = false;
      this.spinnerText = 'Loading';
    });
  }

  ngOnDestroy(){
    if(this.configSub){ this.configSub.unsubscribe(); }
    if(this.facetSub){ this.configSub.unsubscribe(); }
    if(this.resultTypeSub){ this.resultTypeSub.unsubscribe(); }
  }

}
