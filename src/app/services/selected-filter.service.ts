import { Injectable } from '@angular/core';
import { SelectedFilter} from "../model/selected-filter";
import { Globals } from "../globals";

@Injectable({
  providedIn: 'root'
})
export class SelectedFilterService {

  constructor(private globals: Globals) { }

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
    // if we didn't thing this, lets add it
    if(!doesExist) {
      let thisFilter = new SelectedFilter(label, name, value, isApplicable);
      this.globals.selectedFilters.push(thisFilter);
    }
  }

  // for filters that can only have one value, we use addReplaceSelectedFilter
  addReplaceSelectedFilter(label: string, name: string, value: string){
    // if the filter we want to add already exists, we want to remove it
    if(this.globals.selectedFilters.length > 0){
      for(let i in this.globals.selectedFilters){
        if(this.globals.selectedFilters[i].name == name){
          this.globals.selectedFilters.splice(i,1);
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
          this.globals.selectedFilters.splice(i,1);
        }
      }
    }
  }
}
