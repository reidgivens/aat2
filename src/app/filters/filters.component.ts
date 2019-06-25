import {Component, ViewChild, ViewContainerRef, OnInit} from '@angular/core';
import {Globals} from "../globals";
import {ResultType} from "../model/result-type";
import {FilterService} from "../services/filter.service";
import {verticleSlide} from "../animations";
import {Subscription} from "rxjs";
import {FormGroup, FormArray} from "@angular/forms";
import {FilterFormService} from "../services/filter-form.service";
import {SelectedFilterService} from "../services/selected-filter.service";
import {Field} from "../model/field";
import {FieldService} from "../services/field.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  animations: [verticleSlide]
})
export class FiltersComponent implements OnInit {

  public isResultTypeCollapsed = true; // to control the side rail
  public resultTypes = ResultType.getResultTypes(); // to create the resultType links
  public exposeSecondaryFilters = false; // the secondary form filters show/hide
  private resultType: ResultType; // the active result type
  private resultTypeSub: Subscription; // subscribtion to the active result type
  public filterForm: FormGroup; // the reference to our form
  public filterFormSub: Subscription; // the subscription to keep our filterForm updated
  public filters: FormArray;

  @ViewChild('primary', {read: ViewContainerRef}) primaryViewContainerRef: ViewContainerRef;
  @ViewChild('secondary', {read: ViewContainerRef}) secondaryViewContainerRef: ViewContainerRef;

  constructor(
    private globals: Globals,
    private filterService: FilterService,
    private filterFormService: FilterFormService,
    private selectedFilterService: SelectedFilterService,
    private fieldService: FieldService,
    private router: Router) {
  }

  ngOnInit() {
    this.resultTypeSub = this.globals.resultType$.subscribe( resultType => {
      this.resultType = resultType;
      this.loadFilters();
    });

    this.filterFormSub = this.filterFormService.filterForm$.subscribe(filterForm => {
      this.filterForm = filterForm;
      this.filters = this.filterForm.get('filters') as FormArray;
    });
  }

  private loadFilters() {
    // remove all of the formControls
    this.filterFormService.clearFilters();
    // now clear the UI components
    this.primaryViewContainerRef.clear();
    this.secondaryViewContainerRef.clear();
    this.exposeSecondaryFilters = false;
    // now add the primary ones back in
    this.loadPrimaryFilters();
  }

  loadPrimaryFilters() {
    // iterate over the list of filters for this resultType
    for (let v of this.resultType.primaryFilters) {
      this.filterService.loadFilter(this.primaryViewContainerRef, v);
    }
  }

  toggleSecondaryFilters() {
    // see if we are opening or closing it
    this.exposeSecondaryFilters = !this.exposeSecondaryFilters;
    if (this.exposeSecondaryFilters) {
      for (let v of this.resultType.secondaryFilters) {
        this.filterService.loadFilter(this.secondaryViewContainerRef, v);
      }
    } else {
      this.secondaryViewContainerRef.clear();
    }
  }

  onSubmit(){
    let paramsForUrl = {};
    let formFilters = this.filterForm.get('filters');
    for(let formGroup of formFilters['controls']){ // iterate over the filter components
      for(let control in formGroup['controls']){ // iterate over the controls for this component
        let thisControl = formGroup.get(control);
        let thisField = Field.getField(control); // so we can name this properly
        // if we didn't find the field in the model list, skip this one
        if(thisField === undefined){
          continue;
        }
        // see if we are single or multi value items
        if(thisControl.hasOwnProperty('controls')){ // if true, we have a multiselect
          let facets = this.fieldService.getFacets(control); // we need the faces - facet.name = value
          let valuesToKeep = []; // to store the values we want (control.value = true)
          for(let facet in facets){ // iterate over the facets
            if(thisControl.at(facet).value){ // if this value is true, it was checked
              valuesToKeep.push(facets[facet].name);
            }
          }
          if(valuesToKeep.length > 0) { // if we have any to keep, store it
            paramsForUrl[thisField.name] = valuesToKeep;
          }
        } else { // we have a single input
          if(thisControl.value) { // not need to store empty values
            paramsForUrl[thisField.name] = thisControl.value;
          }
        }
      }
    }
    // lets trigger a navigation
    this.router.navigate(['/' + this.globals.resultType.name], { queryParams: paramsForUrl });
    return false;
  }

}
