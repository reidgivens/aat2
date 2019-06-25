import { Component, OnInit } from '@angular/core';
import {verticleSlide} from "../../animations";
import { FormGroup, FormControl, FormArray} from "@angular/forms";
import { SelectedFilterService} from "../../services/selected-filter.service";
import {Subscription} from "rxjs";
import {FilterFormService} from "../../services/filter-form.service";
import {FieldService} from "../../services/field.service";
import {SelectedFilter} from "../../model/selected-filter";

@Component({
  selector: 'app-receivers',
  templateUrl: './receivers.component.html',
  styleUrls: ['./receivers.component.scss'],
  animations: [verticleSlide]
})
export class ReceiversComponent implements OnInit {

  public isCollapsed = true;
  public receiverGroup: FormGroup;
  public filterForm: FormGroup; // the reference to our parent form
  public filterFormSub: Subscription; // the subscription to keep our filterForm updated
  public validReceivers: Array<any>;
  public selectedFilters: Array<SelectedFilter>;
  public selectedFiltersSub: Subscription;

  constructor(private selectedFilterService: SelectedFilterService, private filterFormService: FilterFormService, private fieldService: FieldService) {
    this.validReceivers = this.fieldService.getFacets('receivers');
  }

  ngOnInit() {
    this.filterFormSub = this.filterFormService.filterForm$.subscribe(filterForm => {
      this.filterForm = filterForm;
    });

    this.receiverGroup = new FormGroup({
      receivers: new FormArray([], {updateOn: 'change'})
    });

    // add a form control for each validTelescope
    this.validReceivers.map((o) => {
      const control = new FormControl(o.selected);
      (this.receiverGroup.controls.receivers as FormArray).push(control);
    });

    this.filterFormService.addFilter(this.receiverGroup);

    this.selectedFiltersSub = this.selectedFilterService.selectedFilters$.subscribe( selectedFilters => {
      this.selectedFilters = selectedFilters;
      this.loadFilters();
    });
  }

  ngOnDestroy(){
    this.filterFormService.deleteFilterByHasKey('receivers');
  }

  loadFilters(){
    // collect all the filters for this control type
    let filters: Array<string> = [];
    for(let filter of this.selectedFilters){
      if(filter.name == 'receivers'){
        filters.push(filter.value);
      }
    }
    let fa = this.receiverGroup.get('receivers') as FormArray;
    // now iterate over the valid options and see if we have a filter it
    this.validReceivers.forEach((item, index) => {
      let fc = fa.at(index);
      if(filters.indexOf(item.name) !== -1){
        fc.setValue(true);
      } else {
        fc.setValue( false);
      }
    });
  }

}
