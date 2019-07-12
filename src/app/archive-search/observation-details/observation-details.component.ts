import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SearchResultsService } from "../services/search-results.service";
import { WebAnalyticsService } from "../../web-analytics/web-analytics.service";
import { CartService } from "../services/cart.service";
import {Observation} from "../model/observation";

@Component({
  selector: 'app-observation-details',
  templateUrl: './observation-details.component.html',
  styleUrls: ['./observation-details.component.scss']
})
export class ObservationDetailsComponent implements OnInit {

  public spinner = true;
  public expandedAbstract: boolean = false;
  public showBack = false;

  public observation: Observation;

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
    if(this.expandedAbstract || this.observation.abstract.length < 200){
      return this.observation.abstract;
    } else {
      var abs = this.observation.abstract.substr(0, 200);
      return abs.substring(0,abs.lastIndexOf(' ')) + ' ...';
    }
  }

  getSearchResults(objectId: string){
    this.spinner = true;
    this.searchResultsService.getObservationDetails(objectId).subscribe((searchResults) => {
      const keys = searchResults.headers.keys();
      let headers = keys.map(key => `${key}: ${searchResults.headers.get(key)}`);
      this.observation = JSON.parse(searchResults.body).data;

      this.spinner = false;
      this.analytics.sendBeacon();
    });
  }

  getLat(latLng: string){
    let coords = latLng.split(',');
    return parseFloat(coords[0]);
  }

  getLng(latLng: string){
    let coords = latLng.split(',');
    return parseFloat(coords[1]) + 180;
  }

  addToCart(){
    this.cart.addItem(this.observation.title,'Observation', this.observation.sci_prod_locator, this.observation.access_estsize);
  }

}
