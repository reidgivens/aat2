import { Component, OnInit } from '@angular/core';
import { verticleSlide } from "../../animations";
import { FormGroup, FormControl } from "@angular/forms";
import { SelectedFilterService } from "../../services/selected-filter.service";
import { ValidateDate } from "../../validators/date-validator";
import { FilterFormService } from "../../services/filter-form.service";
import { Subscription } from "rxjs";
import {SelectedFilter} from "../../model/selected-filter";

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss'],
  animations: [verticleSlide]
})
export class DatesComponent implements OnInit {

  public isCollapsed: boolean = true;
  public dateGroup: FormGroup; // the form group for controls in this component
  public filterForm: FormGroup; // the reference to our parent form
  public filterFormSub: Subscription; // the subscription to keep our filterForm updated
  public selectedFilters: Array<SelectedFilter>;
  public selectedFiltersSub: Subscription;

  constructor(private selectedFilterService: SelectedFilterService, private filterFormService: FilterFormService) { }

  ngOnInit() {
    this.filterFormSub = this.filterFormService.filterForm$.subscribe(filterForm => {
      this.filterForm = filterForm;
    });

    this.dateGroup = new FormGroup({
      toDate: new FormControl('', { validators: ValidateDate, updateOn: "blur"}),
      fromDate: new FormControl('', { validators: ValidateDate, updateOn: "blur"}),
      to_date: new FormControl(''),
      from_date: new FormControl(''),
    });

    // to_date and from_date are the real fields that get submitted as filter
    // toDate and fromDate are just there for the UI controls
    // they are different because angular bootstraps deals with the control values as objects, not strings
    // the two sets of fields are to switch from objects to strings and back
    // we will filter out the fake ones on form submit

    this.filterFormService.addFilter(this.dateGroup);

    this.selectedFiltersSub = this.selectedFilterService.selectedFilters$.subscribe( selectedFilters => {
      this.selectedFilters = selectedFilters;
      this.dateGroup.get('toDate').reset();
      this.dateGroup.get('fromDate').reset();
      this.loadFilters();
    });

    this.onChanges();
  }

  loadFilters(): void {
    for(let filter of this.selectedFilters){
      if(filter.name == 'to_date'){
        let dateObj = filter.value.split('-');
        this.dateGroup.get('toDate').setValue({ year: parseInt(dateObj[0]), month: parseInt(dateObj[1]), day: parseInt(dateObj[2])});
      } else if (filter.name == 'from_date'){
        let dateObj = filter.value.split('-');
        this.dateGroup.get('fromDate').setValue({ year: parseInt(dateObj[0]), month: parseInt(dateObj[1]), day: parseInt(dateObj[2])});
      }
    }
  }

  onChanges(): void {
    // from object in UI control to the submittable fields
    this.dateGroup.get('toDate').valueChanges.subscribe(val => {
      if(this.dateGroup.get('toDate').valid && val !== null) {
        this.dateGroup.get('to_date').setValue(val.year + '-' + (val.month < 10 ? '0' : '') + val.month + '-' + (val.day < 10 ? '0' : '') + val.day);
      }
    });
    this.dateGroup.get('fromDate').valueChanges.subscribe(val => {
      if(this.dateGroup.get('fromDate').valid && val !== null) {
        this.dateGroup.get('from_date').setValue(val.year + '-' + (val.month < 10 ? '0' : '') + val.month + '-' + (val.day < 10 ? '0' : '') + val.day);
      }
    });
  }

  ngOnDestroy(){
    this.filterFormService.deleteFilterByHasKey('to_date');
  }

}
