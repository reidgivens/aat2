import {Component, Input, OnInit} from '@angular/core';
import {verticleSlide} from "../../../animations";
import { FormGroup, FormControl, FormArray} from "@angular/forms";
import { SelectedFilterService} from "../../services/selected-filter.service";
import {Subscription} from "rxjs";
import {FilterFormService} from "../../services/filter-form.service";
import {SelectedFilter} from "../../model/selected-filter";
import {ResultTypeService} from "../../services/result-type.service";
import { FacetsService } from "../../services/facets.service";


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

  constructor(
    private facetService: FacetsService,
    private selectedFilterService: SelectedFilterService,
    private filterFormService: FilterFormService,
    private resultTypeService: ResultTypeService) {
    this.validConfigurations = this.facetService.getFacet('vla_configuration');
  }

  ngOnInit() {
    this.filterFormSub = this.filterFormService.filterForm$.subscribe(filterForm => {
      this.filterForm = filterForm;
    });

    this.configurationGroup = new FormGroup({
      vla_configuration: new FormArray([], {updateOn: 'change'})
    });

    // add a form control for each validTelescope
    this.validConfigurations.map((o) => {
      const control = new FormControl(o.selected);
      (this.configurationGroup.controls.vla_configuration as FormArray).push(control);
    });

    this.filterFormService.addFilter(this.configurationGroup);

    this.selectedFiltersSub = this.selectedFilterService.selectedFilters$.subscribe( selectedFilters => {
      this.selectedFilters = selectedFilters;
      this.loadFilters();
    });
  }

  ngOnDestroy(){
    this.filterFormService.deleteFilterByHasKey('vla_configuration');
    if (this.selectedFiltersSub) { this.selectedFiltersSub.unsubscribe(); }
    if (this.filterFormSub) { this.filterFormSub.unsubscribe(); }
  }

  loadFilters(){
    // collect all the filters for this control type
    let filters: Array<string> = [];
    for(let filter of this.selectedFilters){
      if(filter.name == 'vla_configuration'){
        filters.push(filter.value);
      }
    }
    let fa = this.configurationGroup.get('vla_configuration') as FormArray;
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
