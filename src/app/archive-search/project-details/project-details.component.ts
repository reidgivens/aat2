import {Component, Input, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SearchResultsService } from "../services/search-results.service";
import { WebAnalyticsService } from "../../web-analytics/web-analytics.service";
import { CartService } from "../services/cart.service";
import {Observation} from "../model/observation";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  public spinner = true;
  public expandedAbstract: boolean = false;
  public showBack = false;

  public project: Observation;
  public observations: Array<Observation>;

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
    if(this.expandedAbstract || this.project.abstract.length < 200){
      return this.project.abstract;
    } else {
      var abs = this.project.abstract.substr(0, 200);
      return abs.substring(0,abs.lastIndexOf(' ')) + ' ...';
    }
  }

  getSearchResults(objectId: string){
    this.spinner = true;
    this.searchResultsService.getProjectDetails(objectId).subscribe((searchResults) => {
      console.log(searchResults);
      const keys = searchResults.headers.keys();
      let headers = keys.map(key => `${key}: ${searchResults.headers.get(key)}`);
      let jsonSearchResults = JSON.parse(searchResults.body).data;
      this.project = jsonSearchResults[0];
      this.observations = jsonSearchResults;

      console.log(jsonSearchResults);

      this.spinner = false;
      this.analytics.sendBeacon();
    });
  }

  addToCart(i: number){
    this.cart.addItem(this.observations[i].title,'Project', this.observations[i].sci_prod_locator, this.observations[i].access_estsize);
  }


}
