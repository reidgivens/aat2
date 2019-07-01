import { Injectable } from '@angular/core';
import { SelectedFilter} from "../model/selected-filter";
import { Router, ActivatedRoute } from "@angular/router";
import {BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SelectedFilterService {

  private selectedFilters: Array<SelectedFilter> = [];
  private _selectedFilters: BehaviorSubject<Array<SelectedFilter>> = new BehaviorSubject(this.selectedFilters);
  public readonly selectedFilters$: Observable<Array<SelectedFilter>> = this._selectedFilters.asObservable();

  private savedFilters: Array<any> = [];
  private _savedFilters: BehaviorSubject<Array<any>> = new BehaviorSubject(this.savedFilters);
  public readonly savedFilters$: Observable<Array<any>> = this._savedFilters.asObservable();

  constructor(private route: ActivatedRoute, private router: Router) {
    this.getSavedFilters();
  }

  sortSelectedFilters(){
    // sort them so they are always displayed in the same order
    // having filters jump around on view change is confusing
    this.selectedFilters.sort((a,b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      const aValue = a.value.toLowerCase();
      const bValue = b.value.toLowerCase();

      let comparison = 0;
      if(aName > bName){
        comparison = 1;
      } else if(bName > aName) {
        comparison = -1;
      }
      if(comparison == 0){
        if(aValue > bValue){
          comparison = 1;
        } else if(bValue > aValue) {
          comparison = -1;
        }
      }
      return comparison;
    });
    // now emit the change
    this._selectedFilters.next(this.selectedFilters);
  }

  addSelectedFilter(label: string, name: string, value: string){
    let isApplicable: boolean = true; // so we know if this filter is applicable to this result type
    // TODO: eventually we will need to store what filers apply to each result set
    let doesExist: boolean = false; // so we know whether to add a new filter or not
    // first we see if this filter already exists
    if(this.selectedFilters.length > 0){
      for(let i in this.selectedFilters){
        // match on name and value
        if(this.selectedFilters[i].name == name && this.selectedFilters[i].value == value){
          doesExist = true; // so we don't make a new one
          // while we are here, lets make sure we have the right flag
          this.selectedFilters[i].applicable = isApplicable;
          break;
        }
      }
    }
    // if we didn't find this, lets add it
    if(!doesExist) {
      let thisFilter = new SelectedFilter(label, name, value, isApplicable);
      this.selectedFilters.push(thisFilter);
    }
  }

  // for filters that can only have one value, we use addReplaceSelectedFilter
  addReplaceSelectedFilter(label: string, name: string, value: string){
    // if the filter we want to add already exists, we want to remove it
    if(this.selectedFilters.length > 0){
      for(let i in this.selectedFilters){
        if(this.selectedFilters[i].name == name){
          this.selectedFilters.splice(+i,1);
        }
      }
    }
    // now we add the new one
    this.addSelectedFilter(label, name, value);
  }

  removeSelectedFilter(name: string, value: string){
    if(this.selectedFilters.length > 0){
      let madeChange = false; // no reason to initiate a navigation change if nothing changed
      for(let i in this.selectedFilters) {
        // match on name and value
        if (this.selectedFilters[i].name == name && this.selectedFilters[i].value === value) {
          this.selectedFilters.splice(+i, 1);
          madeChange = true;
        }
        // now rebuild the queryparams and trigger a navigation change
        if(madeChange){
          let queryParams = {};
          for(let filter of this.selectedFilters) {
            if(queryParams.hasOwnProperty(filter.name)){
             if(typeof queryParams[filter.name] == "string"){
               queryParams[filter.name] = [queryParams[filter.name], filter.value];
             }  else {
               queryParams[filter.name].push(filter.value);
             }
            } else {
              queryParams[filter.name] = filter.value;
            }
          }
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: queryParams,
            queryParamsHandling: ""
          });
        }
      }
    }
  }

  clearFilters(){
    this.selectedFilters = [];
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
      queryParamsHandling: ""
    });
  }

  saveFilters(name: string){
    if(this.selectedFilters.length < 1){
      return {state: 'failed', message: 'No filters selected to save.'};
    }
    if(this.savedFilters.length > 0){
      for(let sf of this.savedFilters){
        if(sf.name.toLowerCase() == name.toLowerCase()){
          return {state: 'failed', message: 'A saved filter set already has this name. Please use a different name'};
        }
      }
    }
    this.savedFilters.push({name: name, filters: this.selectedFilters});
    localStorage.setItem('savedFilters', JSON.stringify(this.savedFilters));
    this._savedFilters.next(this.savedFilters);
  }

  getSavedFilters(){
    this.savedFilters = [];
    let localStore = localStorage.getItem('savedFilters');
    if(localStore){
      this.savedFilters = JSON.parse(localStore);
    }
    this._savedFilters.next(this.savedFilters);
  }

  loadFilters(name: string){
    for(let savedFilter of this.savedFilters){
      if(savedFilter.name.toLowerCase() == name.toLowerCase()){
        let paramsForUrl = {}; // this is what we will ultimately submit
        savedFilter.filters.forEach((item) => {
          // have we already stated adding the values yet
          if(paramsForUrl.hasOwnProperty(item.name)){
            // if we have seem this before and the value is a string, we need to turn it into an array before we can add to it
            if(typeof paramsForUrl[item.name] == 'string'){
              paramsForUrl[item.name] = [paramsForUrl[item.name]];
            }
            paramsForUrl[item.name].push(item.value);
          } else { // we haven't seen this yet, so just add it
            paramsForUrl[item.name] = item.value;
          }
        });
        this.router.navigate([], { relativeTo: this.route, queryParams: paramsForUrl, queryParamsHandling: "" }).then((result) => {
          this._selectedFilters.next(this.selectedFilters);
        }, (reason) => {
          //
        });
        this.selectedFilters = savedFilter.filters;

        return true;
      }
    }
    return false;
  }

  deleteSavedFilters(name: string){
    for(let i in this.savedFilters){
      if(this.savedFilters[i].name.toLowerCase() == name.toLowerCase()){
        this.savedFilters.splice(+i,1);
        this._selectedFilters.next(this.selectedFilters);
        localStorage.setItem('savedFilters', JSON.stringify(this.savedFilters));
        return true;
      }
    }
  }

}
