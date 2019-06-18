import { Injectable } from '@angular/core';
import { SelectedFilter} from "../model/selected-filter";
import { Globals } from "../globals";
import { Router, ActivatedRoute } from "@angular/router";
import { Field } from "../model/fields";

@Injectable({
  providedIn: 'root'
})
export class SelectedFilterService {

  private selectedFilters: Array<SelectedFilter> = [];

  constructor(private globals: Globals, private route: ActivatedRoute, private router: Router) {
    this.loadSelectedFilters();
  }

  loadSelectedFilters(){
    // get all the allowable fields as defined in the Field model
    const fields = Field.getFields();
    // subscribe to the queryParams
    this.route.queryParamMap.subscribe(queryParams => {
      console.log(queryParams);
      // iterate over the queryParams
      for (let qp of this.route.snapshot.queryParamMap.keys){
        // iterate over the fields array
        // we could do a match to see if it's value, but we need to reference the casing exactly later
        for(let f of fields){
          if(f.toLowerCase() == qp.toLowerCase()){
            // lets get the field so we know if it can hold multiple values
            let field: Field = Field.getField(f);
            let val = queryParams.get(qp);
            if(field.allowMultipleValues){
              this.addSelectedFilter(field.label, field.name, val);
            } else {
              this.addReplaceSelectedFilter(field.label, field.name, val);
            }
            break;
          }
        }
      }
    });
  }

  getSelectedFilters(){
    return this.selectedFilters;
  }

  addSelectedFilter(label: string, name: string, value: string){
    let isApplicable: boolean = true; // so we know if this filter is applicable to this result type
    // TODO: eventually we will need to store what filers apply to each result set
    let doesExist: boolean = false; // so we know whether to add a new filter or not
    // first we see if this filter already exists
    if(this.globals.selectedFilters.length > 0){
      for(let i in this.globals.selectedFilters){
        // match on name and value
        if(this.globals.selectedFilters[i].name == name && this.globals.selectedFilters[i].value == value){
          doesExist = true; // so we don't make a new one
          // while we are here, lets make sure we have the right flag
          this.globals.selectedFilters[i].applicable = isApplicable;
          break;
        }
      }
    }
    // if we didn't find this, lets add it
    if(!doesExist) {
      let thisFilter = new SelectedFilter(label, name, value, isApplicable);
      this.globals.selectedFilters.push(thisFilter);
      // now add it to the path without triggering a navigation event
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          [name]: [value]
        },
        queryParamsHandling: 'merge', // preserve the existing params
        //replaceUrl: true,
        skipLocationChange: true // don't trigger the navigation event
      });
    }
  }

  // for filters that can only have one value, we use addReplaceSelectedFilter
  addReplaceSelectedFilter(label: string, name: string, value: string){
    // if the filter we want to add already exists, we want to remove it
    if(this.globals.selectedFilters.length > 0){
      for(let i in this.globals.selectedFilters){
        if(this.globals.selectedFilters[i].name == name){
          this.globals.selectedFilters.splice(+i,1);
          // now remove it from the path without triggering a navigation event
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
              [name]: null
            },
            queryParamsHandling: 'merge', // preserve the existing params
            //replaceUrl: true,
            skipLocationChange: true // don't trigger the navigation event
          });
        }
      }
    }
    // now we add the new one
    this.addSelectedFilter(label, name, value);
  }

  removeSelectedFilter(name: string, value: string){
    if(this.globals.selectedFilters.length > 0){
      for(let i in this.globals.selectedFilters){
        // match on name and value
        if(this.globals.selectedFilters[i].name == name && this.globals.selectedFilters[i].value == value){
          this.globals.selectedFilters.splice(+i,1);
          // now remove it from the path without triggering a navigation event
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
              [name]: null
            },
            queryParamsHandling: 'merge', // preserve the existing params
            //replaceUrl: true,
            skipLocationChange: true // don't trigger the navigation event
          });
        }
      }
    }
  }
}
