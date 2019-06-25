import { Injectable } from '@angular/core';
import { SelectedFilter} from "../model/selected-filter";
import { Router, ActivatedRoute } from "@angular/router";
import { Field } from "../model/field";
import { FieldService } from "./field.service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SelectedFilterService {

  private selectedFilters: Array<SelectedFilter> = [];
  private _selectedFilters: BehaviorSubject<Array<SelectedFilter>> = new BehaviorSubject(this.selectedFilters);
  public readonly selectedFilters$: Observable<Array<SelectedFilter>> = this._selectedFilters.asObservable();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fieldService: FieldService) {

    this.loadSelectedFilters();
  }

  loadSelectedFilters(){
    this.selectedFilters = [];
    // get all the allowable fields as defined in the Field model
    const fields = Field.getFields();
    // subscribe to the queryParams
    this.route.queryParams.subscribe(queryParams => {
      // iterate over the queryParams
      for (let qp in queryParams) {
        let qpv = queryParams[qp];
        qp = qp.toLowerCase();
        if(qpv.length > 0){ // first make sure we have anything
          if(fields.indexOf(qp) !== -1){ // make sure it's a valid field
            let field = Field.getField(qp);
            if(field.allowMultipleValues){
              let facets = this.fieldService.getFacets(field.name); // to test for valid value
              for(let f of facets){
                if(typeof qpv == "string"){ // for a single value submitted
                  if(f.name.toLowerCase() == qpv.toLowerCase()){
                    this.addSelectedFilter(field.label, field.name, f.name);
                  }
                } else { // for multiple values submitted
                  for(let aVal of qpv){
                    if(f.name.toLowerCase() == aVal.toLowerCase()){
                      this.addSelectedFilter(field.label, field.name, f.name);
                    }
                  }
                }
              }
            } else {
              this.addReplaceSelectedFilter(field.label, field.name, qpv);
            }
          }
        }
      }
      // now sort them so they are always displayed in the same order
      // having filters jump around on view change is confusing
      this.selectedFilters.sort((a,b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        const aValue = a.value.toLowerCase();
        const bValue = b.value.toLowerCase();

        let comparison = 0;
        if(aName > bName){
          comparison = 1;
        } else {
          comparison = -1;
        }
        if(comparison == 0){
          if(aValue > bValue){
            comparison = 1;
          } else {
            comparison = -1;
          }
        }
        return comparison;
      });
      // now emit the change
      this._selectedFilters.next(this.selectedFilters);
    });
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
}
