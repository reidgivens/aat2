import { Component, OnInit } from '@angular/core';
import {verticleSlide} from "../../animations";
import { FormGroup, FormControl, FormArray} from "@angular/forms";
import { SelectedFilterService} from "../../services/selected-filter.service";
import {Subscription} from "rxjs";
import {FilterFormService} from "../../services/filter-form.service";
import {FieldService} from "../../services/field.service";
import {SelectedFilter} from "../../model/selected-filter";

@Component({
  selector: 'app-telescopes',
  templateUrl: './telescopes.component.html',
  styleUrls: ['./telescopes.component.scss'],
  animations: [verticleSlide]
})
export class TelescopesComponent implements OnInit {

  public isCollapsed = true;
  public telescopeGroup: FormGroup;
  public filterForm: FormGroup; // the reference to our parent form
  public filterFormSub: Subscription; // the subscription to keep our filterForm updated
  public validTelescopes: Array<any>;
  public selectedFilters: Array<SelectedFilter>;
  public selectedFiltersSub: Subscription;


  constructor(private selectedFilterService: SelectedFilterService, private filterFormService: FilterFormService, private fieldService: FieldService) {
    this.validTelescopes = this.fieldService.getFacets('telescope');
  }

  ngOnInit() {
    this.filterFormSub = this.filterFormService.filterForm$.subscribe(filterForm => {
      this.filterForm = filterForm;
    });

    this.telescopeGroup = new FormGroup({
      telescope: new FormArray([], {updateOn: 'change'})
    });

    // add a form control for each validTelescope
    this.validTelescopes.map((o) => {
      const control = new FormControl(o.selected);
      (this.telescopeGroup.controls.telescope as FormArray).push(control);
    });

    this.filterFormService.addFilter(this.telescopeGroup);

    this.selectedFiltersSub = this.selectedFilterService.selectedFilters$.subscribe( selectedFilters => {
      this.selectedFilters = selectedFilters;
      this.loadFilters();
    });
  }

  ngOnDestroy(){
    this.filterFormService.deleteFilterByHasKey('telescope');
  }

  loadFilters(){
    // collect all the filters for this control type
    let filters: Array<string> = [];
    for(let filter of this.selectedFilters){
      if(filter.name == 'telescope'){
        filters.push(filter.value);
      }
    }
    let fa = this.telescopeGroup.get('telescope') as FormArray;
    // now iterate over the valid options and see if we have a filter it
    this.validTelescopes.forEach((item, index) => {
      let fc = fa.at(index);
      if(filters.indexOf(item.name) !== -1){
        fc.setValue(true);
      } else {
        fc.setValue( false);
      }
    });
  }
}
