import { Component, OnInit } from '@angular/core';
import { verticleSlide } from "../../../animations";
import { FormGroup, FormControl } from "@angular/forms";
import { SelectedFilterService } from "../../services/selected-filter.service";
import { FilterFormService } from "../../services/filter-form.service";
import { Subscription } from "rxjs";
import {SelectedFilter} from "../../model/selected-filter";

@Component({
  selector: 'app-project',
  templateUrl: './text-search.component.html',
  styleUrls: ['./text-search.component.scss'],
  animations: [verticleSlide]
})
export class TextSearchComponent implements OnInit {
  public isCollapsed: boolean = true;
  public textSearchGroup: FormGroup; // the form group for controls in this component
  public filterForm: FormGroup; // the reference to our parent form
  public filterFormSub: Subscription; // the subscription to keep our filterForm updated
  public selectedFilters: Array<SelectedFilter>;
  public selectedFiltersSub: Subscription;

  constructor(private selectedFilterService: SelectedFilterService, private filterFormService: FilterFormService) { }

  ngOnInit() {
    this.filterFormSub = this.filterFormService.filterForm$.subscribe(filterForm => {
      this.filterForm = filterForm;
    });

    this.textSearchGroup = new FormGroup({
      text_search_str: new FormControl('')
    });

    this.filterFormService.addFilter(this.textSearchGroup);

    this.selectedFiltersSub = this.selectedFilterService.selectedFilters$.subscribe( selectedFilters => {
      this.selectedFilters = selectedFilters;
      this.textSearchGroup.get('text_search_str').reset();
      this.loadFilters();
    });

  }

  loadFilters(): void {
    for(let filter of this.selectedFilters){
      if (filter.name == 'text_search_str') {
        this.textSearchGroup.get(filter.name).setValue(filter.value);
      }
    }
  }

  ngOnDestroy(){
    this.filterFormService.deleteFilterByHasKey('text_search_str');
    if (this.selectedFiltersSub) { this.selectedFiltersSub.unsubscribe(); }
    if (this.filterFormSub) { this.filterFormSub.unsubscribe(); }
  }

}
