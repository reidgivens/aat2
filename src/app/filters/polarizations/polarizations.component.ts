import { Component, OnInit } from '@angular/core';
import {verticleSlide} from "../../animations";
import { FormGroup, FormControl, FormArray} from "@angular/forms";
import { SelectedFilterService} from "../../services/selected-filter.service";
import {Subscription} from "rxjs";
import {FilterFormService} from "../../services/filter-form.service";
import {FieldService} from "../../services/field.service";
import {SelectedFilter} from "../../model/selected-filter";

@Component({
  selector: 'app-polarizations',
  templateUrl: './polarizations.component.html',
  styleUrls: ['./polarizations.component.scss'],
  animations: [verticleSlide]
})
export class PolarizationsComponent implements OnInit {

  public isCollapsed = true;
  public polarizationGroup: FormGroup;
  public filterForm: FormGroup; // the reference to our parent form
  public filterFormSub: Subscription; // the subscription to keep our filterForm updated
  public validPolarizations: Array<any>;
  public selectedFilters: Array<SelectedFilter>;
  public selectedFiltersSub: Subscription;

  constructor(private selectedFilterService: SelectedFilterService, private filterFormService: FilterFormService, private fieldService: FieldService) {
    this.validPolarizations = this.fieldService.getFacets('polarization');
  }

  ngOnInit() {
    this.filterFormSub = this.filterFormService.filterForm$.subscribe(filterForm => {
      this.filterForm = filterForm;
    });

    this.polarizationGroup = new FormGroup({
      polarization: new FormArray([], {updateOn: 'change'})
    });

    // add a form control for each validTelescope
    this.validPolarizations.map((o) => {
      const control = new FormControl(o.selected);
      (this.polarizationGroup.controls.polarization as FormArray).push(control);
    });

    this.filterFormService.addFilter(this.polarizationGroup);

    this.selectedFiltersSub = this.selectedFilterService.selectedFilters$.subscribe( selectedFilters => {
      this.selectedFilters = selectedFilters;
      this.loadFilters();
    });
  }

  ngOnDestroy(){
    this.filterFormService.deleteFilterByHasKey('polarization');
  }

  loadFilters(){
    // collect all the filters for this control type
    let filters: Array<string> = [];
    for(let filter of this.selectedFilters){
      if(filter.name == 'polarization'){
        filters.push(filter.value);
      }
    }
    let fa = this.polarizationGroup.get('polarization') as FormArray;
    // now iterate over the valid options and see if we have a filter it
    this.validPolarizations.forEach((item, index) => {
      let fc = fa.at(index);
      if(filters.indexOf(item.name) !== -1){
        fc.setValue(true);
      } else {
        fc.setValue( false);
      }
    });
  }

}
