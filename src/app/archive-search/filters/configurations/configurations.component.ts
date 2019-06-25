import { Component, OnInit } from '@angular/core';
import {verticleSlide} from "../../../animations";
import { FormGroup, FormControl, FormArray} from "@angular/forms";
import { SelectedFilterService} from "../../services/selected-filter.service";
import {Subscription} from "rxjs";
import {FilterFormService} from "../../services/filter-form.service";
import {FieldService} from "../../services/field.service";
import {SelectedFilter} from "../../model/selected-filter";


@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss'],
  animations: [verticleSlide]
})
export class ConfigurationsComponent implements OnInit {

  public isCollapsed = true;
  public configurationGroup: FormGroup;
  public filterForm: FormGroup; // the reference to our parent form
  public filterFormSub: Subscription; // the subscription to keep our filterForm updated
  public validConfigurations: Array<any>;
  public selectedFilters: Array<SelectedFilter>;
  public selectedFiltersSub: Subscription;

  constructor(private selectedFilterService: SelectedFilterService, private filterFormService: FilterFormService, private fieldService: FieldService) {
    this.validConfigurations = this.fieldService.getFacets('configuration');
  }

  ngOnInit() {
    this.filterFormSub = this.filterFormService.filterForm$.subscribe(filterForm => {
      this.filterForm = filterForm;
    });

    this.configurationGroup = new FormGroup({
      configuration: new FormArray([], {updateOn: 'change'})
    });

    // add a form control for each validTelescope
    this.validConfigurations.map((o) => {
      const control = new FormControl(o.selected);
      (this.configurationGroup.controls.configuration as FormArray).push(control);
    });

    this.filterFormService.addFilter(this.configurationGroup);

    this.selectedFiltersSub = this.selectedFilterService.selectedFilters$.subscribe( selectedFilters => {
      this.selectedFilters = selectedFilters;
      this.loadFilters();
    });
  }

  ngOnDestroy(){
    this.filterFormService.deleteFilterByHasKey('configuration');
    if (this.selectedFiltersSub) { this.selectedFiltersSub.unsubscribe(); }
    if (this.filterFormSub) { this.filterFormSub.unsubscribe(); }
  }

  loadFilters(){
    // collect all the filters for this control type
    let filters: Array<string> = [];
    for(let filter of this.selectedFilters){
      if(filter.name == 'configuration'){
        filters.push(filter.value);
      }
    }
    let fa = this.configurationGroup.get('configuration') as FormArray;
    // now iterate over the valid options and see if we have a filter it
    this.validConfigurations.forEach((item, index) => {
      let fc = fa.at(index);
      if(filters.indexOf(item.name) !== -1){
        fc.setValue(true);
      } else {
        fc.setValue( false);
      }
    });
  }

}
