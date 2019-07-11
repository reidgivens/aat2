import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SearchResultsService } from "../services/search-results.service";
import { WebAnalyticsService } from "../../web-analytics/web-analytics.service";
import { CartService } from "../services/cart.service";

@Component({
  selector: 'app-observation-details',
  templateUrl: './observation-details.component.html',
  styleUrls: ['./observation-details.component.scss']
})
export class ObservationDetailsComponent implements OnInit {

  public spinner = true;
  public expandedAbstract: boolean = false;
  public showBack = false;

  public abstract: string;
  public access_estsize: number;
  public cal_status: string;
  public calib_level: string;
  public cals: Array<any>;
  public coIs: Array<string>;
  public data_rights: string;
  public dataproduct_type: string;
  public eb_id: number;
  public filegroup_id: string;
  public gousId: any;
  public id: string;
  public instrument_name: string;
  public intents: Array<string>;
  public legacy_id: string;
  public mousId: any;
  public num_scans: number;
  public obs_band: Array<string>;
  public obs_id: string;
  public obs_release_date: Date;
  public obs_start: Date;
  public obs_stop: Date;
  public pi: string;
  public project_code: string;
  public sci_prod_locator: string;
  public sousId: any;
  public subscans: Array<object>;
  public title: string;
  public vla_configuration: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private searchResultsService: SearchResultsService,
              private cart: CartService,
              private analytics: WebAnalyticsService) {
    if(document.referrer.split('/')[2] == window.location.host){
      this.showBack = true;
    }

  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if(params.has('objectId')){
        this.getSearchResults(params.get('objectId'));
      }
    });
  }

  goBack() {
    window.history.back();
  }

  getAbstract(){
    if(this.expandedAbstract || this.abstract.length < 200){
      return this.abstract;
    } else {
      var abs = this.abstract.substr(0, 200);
      return abs.substring(0,abs.lastIndexOf(' ')) + ' ...';
    }
  }

  getSearchResults(objectId: string){
    this.spinner = true;
    this.searchResultsService.getObservationDetails(objectId).subscribe((searchResults) => {
      const keys = searchResults.headers.keys();
      let headers = keys.map(key => `${key}: ${searchResults.headers.get(key)}`);
      let jsonSearchResults = JSON.parse(searchResults.body).data;

      console.log(jsonSearchResults);

      this.abstract = jsonSearchResults.abstract;
      this.access_estsize = jsonSearchResults.access_estsize;
      this.cal_status = jsonSearchResults.cal_status;
      this.calib_level = jsonSearchResults.calib_level;
      this.cals = jsonSearchResults.cals;
      this.coIs = jsonSearchResults.coIs;
      this.data_rights = jsonSearchResults.data_rights;
      this.dataproduct_type = jsonSearchResults.dataproduct_type;
      this.eb_id = jsonSearchResults.eb_id;
      this.filegroup_id = jsonSearchResults.filegroup_id;
      this.gousId = jsonSearchResults.gousId;
      this.id = jsonSearchResults.id;
      this.instrument_name = jsonSearchResults.instrument_name;
      if(this.instrument_name == 'EVLA'){ this.instrument_name = 'VLA'; }
      this.intents = jsonSearchResults.intents;
      this.legacy_id = jsonSearchResults.legacy_id;
      this.mousId = jsonSearchResults.mousId;
      this.num_scans = jsonSearchResults.num_scans;
      this.obs_band = jsonSearchResults.obs_band;
      this.obs_id = jsonSearchResults.obs_id;
      this.obs_release_date = new Date(jsonSearchResults.obs_release_date);
      this.obs_start = new Date(jsonSearchResults.obs_start);
      this.obs_stop = new Date(jsonSearchResults.obs_stop);
      this.pi = jsonSearchResults.pi;
      this.project_code = jsonSearchResults.project_code;
      this.sci_prod_locator = jsonSearchResults.sci_prod_locator;
      this.sousId = jsonSearchResults.sousId;
      this.subscans = jsonSearchResults.subscans.map(subscan => {
        let coords = subscan.target_pos_equatorial.split(',');

        // The convention in the Solr index stores geospatial coordinates as lat/long.
        subscan.longitude = parseFloat(coords[1]) + 180;
        subscan.latitude = parseFloat(coords[0]);
        return subscan;
      });
      this.title = jsonSearchResults.title;
      this.vla_configuration = jsonSearchResults.vla_configuration;

      this.spinner = false;
      this.analytics.sendBeacon();
    });
  }

  addToCart(){
    this.cart.addItem(this.title,'Observation', this.sci_prod_locator, this.access_estsize);
  }

}
