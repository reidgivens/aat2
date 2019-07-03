import {Component, ViewChild, ViewContainerRef, OnInit, Input} from '@angular/core';
import { FacetsService } from "../services/facets.service";
import { ResultTypeService } from "../services/result-type.service";
import {ResultType} from "../model/result-type";
import {FilterService} from "../services/filter.service";
import {verticleSlide} from "../../animations";
import {BehaviorSubject, Subscription} from "rxjs";
import {FormGroup, FormArray} from "@angular/forms";
import {FilterFormService} from "../services/filter-form.service";
import {SelectedFilterService} from "../services/selected-filter.service";
import {Field} from "../model/field";
import {ActivatedRoute, Router} from "@angular/router";
import {SelectedFilter} from "../model/selected-filter";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  animations: [verticleSlide]
})
export class FiltersComponent implements OnInit {

  public isResultTypeCollapsed = true; // to control the side rail
  public exposeSecondaryFilters = false; // the secondary form filters show/hide
  public resultTypes = ResultType.getResultTypes(); // to create the resultType links
  public _resultType = new BehaviorSubject<ResultType>(null);
  public filterForm: FormGroup; // the reference to our form
  private filterFormSub: Subscription; // the subscription to keep our filterForm updated
  public filters: FormArray;
  public selectedFilters: Array<SelectedFilter>;
  private selectedFiltersSub: Subscription;
  private facets;



  @Input()
  set resultType(value){
    this._resultType.next(value);
  }

  get resultType(){
    return this._resultType.getValue();
  }

  @ViewChild('primary', {read: ViewContainerRef}) primaryViewContainerRef: ViewContainerRef;
  @ViewChild('secondary', {read: ViewContainerRef}) secondaryViewContainerRef: ViewContainerRef;

  constructor(
    private facetService: FacetsService,
    private resultTypeService: ResultTypeService,
    private filterService: FilterService,
    private filterFormService: FilterFormService,
    private selectedFilterService: SelectedFilterService,
    private router: Router,
    private route: ActivatedRoute) {
    this.facets = this.facetService.getFacets();
  }

  ngOnInit() {
    this._resultType.subscribe(x => {
      this.loadFilters();
    });

    this.filterFormSub = this.filterFormService.filterForm$.subscribe(filterForm => {
      this.filterForm = filterForm;
      this.filters = this.filterForm.get('filters') as FormArray;
    });

    this.selectedFiltersSub = this.selectedFilterService.selectedFilters$.subscribe( selectedFilters => {
      this.selectedFilters = selectedFilters;
    });
  }

  private loadFilters() {
    this.filterFormService.clearFilters(); // remove all of the formControls
    this.exposeSecondaryFilters = false; // hide the secondaryFilters
    this.primaryViewContainerRef.clear(); // now clear the UI components
    this.secondaryViewContainerRef.clear();
    this.loadPrimaryFilters(); // now add the primary ones back in
  }

  loadPrimaryFilters() {
    for (let v of this.resultType.primaryFilters) {
      this.filterService.loadFilter(this.primaryViewContainerRef, v);
    }
  }

  toggleSecondaryFilters() {
    this.exposeSecondaryFilters = !this.exposeSecondaryFilters;
    if (!this.exposeSecondaryFilters) {
      this.secondaryViewContainerRef.clear(); // its closed, so clear it out
    } else { // its open, load em up
      for (let v of this.resultType.secondaryFilters) {
        this.filterService.loadFilter(this.secondaryViewContainerRef, v);
      }
    }
  }

  onSubmit(){
    console.log('submitting form');
    let paramsForUrl = {}; // this is what we will ultimately submit
    // get our current list of selected filters - so we can see what hasn't been addressed in
    // this form submit (due to things like hidden filters) that we want to keep in the URL
    let sflist: Array<string> = this.selectedFilters.reduce((result, item) => {
      if(result.indexOf(item.name) == -1){
        result.push(item.name);
      }
      return result;
    },[]);

    let formFilters = this.filterForm.get('filters'); // all the filters are here in a formArray
    for(let formGroup of formFilters['controls']){ // iterate over each filter components
      for(let control in formGroup['controls']){ // iterate over the fields for this filter component
        let thisControl = formGroup.get(control);
        let thisField = Field.getField(control); // see if there is a field defined for this control
        if(thisField === undefined){ continue; } // skip any control that isn't defined
        // remove any fields we have seen from the list of selected filters (sflist)
        let sflistpos = sflist.indexOf(thisField.name); // see if this control is in the last list of filters
        if(sflistpos !== -1){ sflist.splice(sflistpos, 1); } // if so, remove it so we can overwrite it
        // see if we are single or multi value items
        if(thisControl.hasOwnProperty('controls')){ // if true, we have a multiselect
          if(this.facets.hasOwnProperty(control)){
            let facets = this.facets[control]; // we need the facets - facet.name = value
            let valuesToKeep = []; // to store the values we want (control.value = true)
            for(let facet in facets){ // iterate over the facets
              if(thisControl.at(facet).value){ // if this value is true, it was checked
                valuesToKeep.push(facets[facet].name);
              }
            }
            if(valuesToKeep.length > 0) { // if we have any to keep, store it
              paramsForUrl[thisField.name] = valuesToKeep;
            }
          } else {
            console.warn('No facets found for ' + control);
          }
        } else { // we have a single input
          if(thisControl.value) { // not need to store empty values
            paramsForUrl[thisField.name] = thisControl.value;
          }
        }
      }
    }
    // see if we have any selected filters left - if we do, we want to add them back
    if(sflist.length > 0){
      // iterate over the filters and add any we want to keep back into the paramsForUrl list
      this.selectedFilters.forEach((item) => {
        // do we need to keep this item
        if(sflist.indexOf(item.name) !== -1){
          // have we already stated adding the values yet
          if(paramsForUrl.hasOwnProperty(item.name)){
            // if we have seem this before and the value is a string, we need to turn it into an array before we can add to it
           if(typeof paramsForUrl[item.name] == 'string'){
             paramsForUrl[item.name] = [paramsForUrl[item.name]];
           }
           paramsForUrl[item.name].push(item.value);
          } else { // we haven't seen this yet, so just add it
            paramsForUrl[item.name] = item.value;
          }
        }
      });
    }
    console.warn(paramsForUrl);
    // lets trigger a navigation
    this.router.navigate([], { relativeTo: this.route, queryParams: paramsForUrl, queryParamsHandling: "" });
    return true;
  }

  ngOnDestroy() {
    this.filterFormService.clearFilters();
    if (this._resultType) { this._resultType.unsubscribe(); }
    if (this.filterFormSub) { this.filterFormSub.unsubscribe(); }
  }

}
